import express from "express";
import prisma from "../prismaSingleton";
export const router = express.Router();


router.get("/users", (req, res) => {
    res.send("Hello World");
});

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
        const user = await prisma.user.findFirst({
            where: {
                email: userEmail
            }
        });
        if (user) {
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
    } catch (error) {

    }

})