import { Router } from "express";

import { LangController } from "../useCases/Lang/LangController";

const langRoutes = Router();

const langController = new LangController();

langRoutes.get("/contest/:id_c/language", langController.listAll);
langRoutes.post("/contest/:id_c/language", langController.create);
langRoutes.delete("/language/:id_language", langController.delete);
langRoutes.put("/language/:id_language", langController.update);
langRoutes.get("/language/:id_language", langController.getOne);

export { langRoutes };
