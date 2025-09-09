import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/DB_Config.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8001;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is running on port: ${port}, http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });
