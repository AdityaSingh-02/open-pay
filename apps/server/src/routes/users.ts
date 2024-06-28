import express from "express";
import prisma from "../prismaSingleton";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { JWT_SECRET } from "../config";
import { authMiddleWare } from "../middleware";
import { IAuthMiddleware } from "../middleware";

export const router = express.Router();

router.post("/register", async (req, res) => {
    const {
        userEmail,
        userPhoneNumber,
        userFirstName,
        userLastName,
        userName,
        userAccountNumber,
        userPassword
    } = req.body;
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: userEmail },
                    { username: userName },
                    { number: userPhoneNumber }
                ],
            }
        });

        const existingAccount = await prisma.account.findFirst({
            where: {
                accountNumber: userAccountNumber
            }
        });

        if (existingUser || existingAccount) {
            res.status(400).send("User already exists");
            return;
        }
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const newUser = await prisma.user.create({
            data: {
                email: userEmail,
                number: userPhoneNumber,
                firstName: userFirstName,
                lastName: userLastName,
                username: userName,
                password: hashedPassword,
                accounts: {
                    create: {
                        accountNumber: userAccountNumber,
                        balance: {
                            create: {
                                amount: 0,
                                locked: 0
                            }
                        }
                    }
                }
            }
        });
        const userId = newUser.id;
        const token = jwt.sign({ userId }, JWT_SECRET);
        const returnUser = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            userName: newUser.username,
        }
        res.status(200).json({ token, msg: "Account Created", returnUser })
        return;
    } catch (error: any) {
        res.status(400).json({ code: error.code, meta: error.meta.target })
        return;
    }

});

router.post("/signin", async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ data: "No user found" })
        }

        const isValidUser = await bcrypt.compare(password, user.password);
        if (!isValidUser) {
            return res.status(400).json({ data: "Invalid Credentials" })
        }
        const userId = user.id;
        const token = jwt.sign({ userId }, JWT_SECRET);
        const returnUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.username,
        }
        res.status(200).json({ token, returnUser });
        return;
    } catch (error: any) {
        res.status(400).send(error.message)
        return;
    }
});

// @ts-ignore
router.post("/me", authMiddleWare, async (req: IAuthMiddleware, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: req.userId
            }
        });
        if (!user) {
            res.status(404).json({ data: "User not found" })
            return;
        }
        res.status(200).json(user);
        return;
    } catch (error) {

    }
});


// @ts-ignore
router.get("/balance", authMiddleWare, async (req: IAuthMiddleware, res) => {
    const userId = req.userId;
    try {
        const balance = await prisma.balance.findFirst({
            where: {
                userId
            }
        });
        if (!balance) {
            res.status(404).json({ data: "No balance found" });
            return;
        }
        res.status(200).json(balance.amount);
        return;
    } catch (error: any) {
        res.status(400).send(error.message);
        return;
    }
});