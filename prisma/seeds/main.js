const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

async function main() {
    
    console.log("Project Seeding Started...");
    for(let i = 0; i < 7; i++ ) {
        const adjective = faker.word.adjective();
        const noun = faker.word.noun();
        const title = `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${noun.charAt(0).toUpperCase() + noun.slice(1)}`;
        const description = faker.lorem.sentences(1);
        await prisma.project.create({
            data: {
                title,
                description
            }
        })
    }
    console.log("Project Seeding Done.");

    const data = [];
    for (let i = 0; i < 5; i++) {
        const text = faker.word.verb() + ' ' + faker.word.noun();
        const projectId = faker.number.int({ min: 1, max: 6 });
        data.push({ text, projectId });
    }
    console.log("Task seeding started...");
    await prisma.task.createMany({ data });
    console.log("Task seeding done.");

}

main();