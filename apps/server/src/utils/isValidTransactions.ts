import prisma from "../prismaSingleton";
import { IUser } from "../types/user";

const isValidTransactions = async (userId: number, amount: number) => {
    try {
        const userBalance = await prisma.balance.findFirst({
            where: {
                userId
            }
        });
        if (!userBalance) {
            return false;
        }
        return userBalance.amount >= amount;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default isValidTransactions;