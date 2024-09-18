import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        const data = await prisma.task.findMany({
            orderBy: { id: "desc" },
        })
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// curl -X POST localhost:8000/tasks -d text="New text"
router.post("/", async function (req, res) {
    const { text } = req.body;
    try {
        if(!(text)) {
            return res.status(400).json({ msg: "text required" });
        }
        const task = await prisma.task.create({
            data: {
                text,
                projectId,
            }
        })
        res.status(201).json(task);
    } catch (e) {
        res.status(500).json({ error: e})
    }
})

// curl -X DELETE localhost:8000/tasks/5
router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: Number(id) },
        })
        res.status(204);
    } catch (e) {
        res.status(500).json({ error: e})
    }
})

export const taskRouter = router;