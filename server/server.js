import app from "./app.js";
import * as dotenv from "dotenv";
const PORT = 8000;
dotenv.config({ path: "./config/.env" });

console.log(process.env.test);

app.listen(process.env.PORT || PORT, () => {
    console.log(`server on ${PORT}`);
});
