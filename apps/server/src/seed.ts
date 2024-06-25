const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

async function main() {
    console.log('Hello world!');
    await prisma.balance.update({
        where: {
            userId: 17
        },
        data: {
            amount: {
                increment: 10000
            }
        }
    })
}

main();