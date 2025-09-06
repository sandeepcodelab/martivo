import express from "express";

const app = express();

app.get("/test", (req, res) => {
    res.send("Hello this is testing request")
})


export default app;