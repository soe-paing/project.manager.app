import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        const data = await prisma.project.findMany({
            orderBy: { id: "desc" },
        })
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get("/:id", async function (req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.project.findUnique({
            where: { id: Number(id) },
            include: { tasks: true },
        })
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e})
    }
});

// curl -X POST localhost:8000/projects -d title="New Title"
router.post("/", async function (req, res) {
    const { newProject } = req.body;
    try {
        if(!newProject.title || !newProject.description || !newProject.dueDate) {
            return res.status(400).json({ msg: "Fill in all required field.." });
        }
        const project = await prisma.project.create({
            data: newProject
        });
        res.status(201).json(project);
    } catch (e) {
        console.error(e);  // This will give you full error details
        res.status(500).json({ error: e.message || e });
    }
})

// curl -X DELETE localhost:8000/projects/8
router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    try {
        await prisma.project.delete({
            where: { id: Number(id) },
        })
        res.status(204);
    } catch (e) {
        res.status(500).json({ error: e})
    }
})

export const projectRouter = router;