import { Router } from "express";

import { ContestController } from "../useCases/Contest/ContestController";

const contestsRoutes = Router();

const contestController = new ContestController();

contestsRoutes.get("/contest", contestController.listAll);
contestsRoutes.get("/contest/:id_c", contestController.getOne);
contestsRoutes.post("/contest", contestController.create);
contestsRoutes.put("/contest/:id_c", contestController.update);
contestsRoutes.delete("/contest/:id_c", contestController.delete);

export { contestsRoutes };
