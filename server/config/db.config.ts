import { PrismaClient } from "@prisma/client";
//prisma client instance with db connection function

const prisma = new PrismaClient();
const checkDbConnection = async () => {
    try {
        await prisma.$connect();
        console.log("Connected db successfully")

    }
    catch (err) {
        console.error("Error connecting db");
        process.exit(1);
    }
}
export { prisma, checkDbConnection };