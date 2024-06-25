import express, { Request, Response } from "express";
import { authMiddleWare } from "../middleware";
import prisma from "../prismaSingleton";
import isValidTransactions from "../utils/isValidTransactions";
import transferFunds from "../utils/TransferFunds";


export const router = express.Router();

// @ts-ignore
router.post("/transfer", authMiddleWare, async (req: Request, res: Response) => {
    const { senderId, receiverId, sendAmount } = req.body;
    if (senderId === receiverId) {
        res.status(400).send("Cannot transfer to self");
        return;
    }
    try {
        const transfer = await transferFunds(senderId, receiverId, sendAmount);
        console.log(transfer);
        if (transfer?.staus === 404) {
            res.status(400).send(transfer.message);
            return;
        }
        res.status(200).json(transfer?.message);
        return;
    } catch (error: any) {
        res.status(400).send(error.message);
        return;
    }
})

