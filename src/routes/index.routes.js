import { Router } from "express";

const router = Router();

router.get("/", (req,res)=> res.send("API Shortly"));

export default router;