import { Router } from "express";
import authRouter from "./auth.routes.js";

const router = Router();

router.use(authRouter);

router.get("/", (req,res)=> res.send("API Shortly"));

export default router;