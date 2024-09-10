const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.project.delete({
        where: { id: 1 },
    })
    .then(() => console.log("Deleted User 1"))
    .catch(e => {
    console.error(e);
    process.exit(1);
    })
    .finally(() => {
    prisma.$disconnect();
    });
}

main();