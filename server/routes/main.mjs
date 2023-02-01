import { Router } from "express";
import { postLogin } from "../controllers/apiAuthController.mjs";

///api login
const router = Router();

router.get("/", (req, res) => {
    console.log("login route");
    res.send("login route");
});

router.post("/", postLogin);
router.post("/signup", (req, res) => {
    console.log("signup route");
});

export { router as mainRoutes };
