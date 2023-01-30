import app from "./app.js";
import * as dotenv from "dotenv";
import { connectDB } from "./config/db.cjs";
const PORT = 8000;

dotenv.config({ path: "./config/.env" });

async function server() {
    console.log("starting server");
    await connectDB(process.env.connect_string);

    app.listen(process.env.PORT || PORT, () => {
        console.log(`server on ${PORT}`);
    });
}

server();
