import { Router } from "express";

import { LangController } from "../useCases/Lang/LangController";

const langRoutes = Router();

const langController = new LangController();

langRoutes.get("/contest/:id_c/problem", langController.listAll);
langRoutes.post("/contest/:id_c/language", langController.create);
langRoutes.delete("/problem/:id_problem", langController.delete);

export { langRoutes };
