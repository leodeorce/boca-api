import { Router } from "express";

import { LangController } from "../useCases/Lang/LangController";

const langRoutes = Router();

const langController = new LangController();

langRoutes.get("/contest/:id_c/language", langController.listAll);
langRoutes.post("/contest/:id_c/language", langController.create);
langRoutes.delete("/contest/:id_c/language/:id_l", langController.delete);
langRoutes.put("/contest/:id_c/language/:id_l", langController.update);
langRoutes.get("/contest/:id_c/language/:id_l", langController.getOne);

export { langRoutes };
