import { Prisma } from "@prisma/client";
import prisma from "../prismaSingleton";
import isValidTransactions from "./isValidTransactions";

const transferFunds = async (senderId: number, receiverId: number, sendAmount: number) => {
    try {
        const funds = await isValidTransactions(senderId, sendAmount);
        if (!funds) {
            return { message: "Insufficient funds", success: false, staus: 404 };
        }
        const txn = await prisma.$transaction(async (tx) => {
            const sender = await tx.balance.update({
                where: {
                    userId: senderId
                },
                data: {
                    amount: {
                        decrement: sendAmount
                    }
                }
            });

            const recipient = await tx.balance.update({
                where: {
                    userId: receiverId
                },
                data: {
                    amount: {
                        increment: sendAmount
                    }
                }
            });
            return recipient
        }, {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable
        });
        return { message: "Transfer Success", succcess: true, status: 200 };
    } catch (error: any) {
        return { message: error.message + "", success: false, status: 400 };
    }
}

export default transferFunds