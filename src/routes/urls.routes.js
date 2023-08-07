import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";

const urlsRouter = Router();


urlsRouter.use(validateToken);

urlsRouter.post("/urls/shorten", )

export default urlsRouter;