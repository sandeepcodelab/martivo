import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./.env"})

const port = process.env.PORT || 8001;

app.get("/test", (req, res) => {
    res.send("Hello this is testing request")
})


app.listen(port, () => {
    console.log(`App is running on port: ${port}, http://localhost:${port}`);
})