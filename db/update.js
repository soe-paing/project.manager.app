const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.project.upsert({
        where: { id: 3 },
        //if found id: 3 update title , 
        update: {
            title: "Learn update"
        },
        //if not create new .
        create: {
            title: "Learn update",
            description: "updated description",
        }
    })

    const data = await prisma.project.findMany();
    console.log(data);
}

main();