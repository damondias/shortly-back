import { Router } from "express";
import authRouter from "./auth.routes.js";
import urlsRouter from "./urls.routes.js";

const router = Router();

router.use(authRouter);
router.use(urlsRouter);

router.get("/", (req,res)=> res.send("API Shortly"));

export default router;