import { Router } from "express";
import authRouter from "./auth.routes.js";
import urlsRouter from "./urls.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(urlsRouter);

router.get("/", (req,res)=> res.send("API Shortly"));

export default router;