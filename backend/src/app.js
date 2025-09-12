import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routers
import healthcheckRouter from "./routes/healthcheckRoute.js";
import authRouter from "./routes/authRoute.js";

const app = express();

app.get("/test", (req, res) => {
  res.send("Hello this is testing request");
});

// Basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authRouter);

export default app;
