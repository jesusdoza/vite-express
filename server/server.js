import app from "./app.js";
const PORT = 8000;

app.listen(process.env.PORT || PORT, () => {
    console.log(`server on ${PORT}`);
});
