import { Router } from "express";

///api login
const router = Router();

router.get("/", (req, res) => {
    console.log("login route");
    res.send("login route");
});

router.post("/", (req, res) => {
    console.log("login route");
    res.send("login");
});
router.post("/signup", (req, res) => {
    console.log("signup route");
});

export { router as mainRoutes };
