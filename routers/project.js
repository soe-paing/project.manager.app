import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/projects", async function (req, res) {
    try {
        const data = await prisma.project.findMany({
            orderBy: { id: "desc" },
        })
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get("/projects/:id", async function (req, res) {
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

// curl -X POST localhost:8000/projects -d title="Some Content" description="Some Description" dueDate="09-12-2024"
router.post("/projects", async function (req, res) {
    const { title, description, dueDate } = req.body;
    try {
        if(!(title || description || dueDate)) {
            return res.status(400).json({ msg: "content required" });
        }
        const project = await prisma.project.create({
            data: {
                title, description, dueDate
            },
            include: {
                tasks: true,
            }
        })
        res.status(201).json(project);
    } catch (e) {
        res.status(500).json({ error: e})
    }
})

// curl -X DELETE localhost:8000/projects/8
router.delete("/projects/:id", async function (req, res) {
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