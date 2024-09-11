import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useParams } from "react-router-dom";
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
    const { id } = useParams();
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

module.exports = { projectRouter: router };