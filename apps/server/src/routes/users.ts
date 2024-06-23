import express from "express";
import prisma from "../prismaSingleton";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";

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
            return res.status(400).send("User already exists");
        }

        const newUser = await prisma.user.create({
            data: {
                email: userEmail,
                number: userPhoneNumber,
                firstName: userFirstName,
                lastName: userLastName,
                username: userName,
                password: userPassword,
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
        if (newUser) {
            const userId = newUser.id;
            const token = jwt.sign({ userId }, JWT_SECRET);
            return res.status(200).json({ token, msg: "Account Created" })
        }
    } catch (error: any) {
        return res.status(400).json({ code: error.code, meta: error.meta.target })
    }

})