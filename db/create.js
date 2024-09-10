const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.project.create({
        data: {
            title: "Learn React",
            description: "Some Description for testing",
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

