import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.project.create({
        data: {
            title: "Learn React",
            description: "Some Description for testing",
            dueDate: "2024-09-11",
            tasks: {
                create: [
                    { text: "task one"},
                    { text: "task two"},
                ]
            }
        }
    })
    console.log("Done ... ");
}

main();

