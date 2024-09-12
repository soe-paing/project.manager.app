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
    try {
        const { id } = req.params;
        const data = await prisma.project.findUnique({
            where: { id: Number(id) },
            include: { tasks: true },
        })
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e})
    }
});

export const projectRouter = router;