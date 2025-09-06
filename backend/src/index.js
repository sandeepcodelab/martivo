import dotenv from "dotenv";
import app from "./app.js";


dotenv.config({ 
        path: "./.env"
    });


const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`App is running on port: ${port}, http://localhost:${port}`);
})