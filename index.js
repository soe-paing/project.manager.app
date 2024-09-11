import express from "express";
const app = express();

app.get("/projects/", (req, res) => {
    res.json({msg: "projects"});
})

app.listen(8000, () => {
    console.log("Project api is running at 8000: ... ");
})