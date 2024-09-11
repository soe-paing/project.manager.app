import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const data = await prisma.task.findMany({
        include: {
            tasks: true,
        }
    })

    console.log(data);
}

main();