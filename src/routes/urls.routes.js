import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/urls.schemas.js";
import { deleteShorten, getShortUrl, getUrlById, postShorten } from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get('/urls/open/:shortUrl', getShortUrl);

urlsRouter.use(validateToken);

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), postShorten);
urlsRouter.delete("/urls/:id", deleteShorten);

export default urlsRouter;