import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { getRanking, getUserById } from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get("/users/me", validateToken, getUserById);
usersRouter.get('/ranking', getRanking);

export default usersRouter;