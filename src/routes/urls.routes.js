import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/urls.schemas.js";
import { postShorten } from "../controllers/urls.controllers.js";

const urlsRouter = Router();


urlsRouter.use(validateToken);

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), postShorten)

export default urlsRouter;