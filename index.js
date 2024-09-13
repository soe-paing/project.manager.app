import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { projectRouter } from './routers/project.js'
app.use('/', projectRouter)

app.listen(8000, () => {
    console.log("Project api is running at 8000: ... ");
})