import express from "express";
export const router = express.Router();


router.get("/users", (req, res) => {
    res.send("Hello World");
});

// router.post("/register", async (req, res) => {
//     const {
//         session,
//         userEmail,
//         userPhoneNumber,
//         userFirstName,
//         userLastName,
//         userAccountNumber
//     } = req.body;
//     if(!session) {
//         res.status(400).send("Session not found");
//     }
//     const isUserValid = await prismaClient

// })