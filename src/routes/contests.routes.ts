import { Router } from "express";

import { ContestController } from "../useCases/Contest/ContestController";

const contestsRoutes = Router();

const contestController = new ContestController();

contestsRoutes.get("/contest", contestController.listAll);
contestsRoutes.get("/contest/:id", contestController.getOne);
contestsRoutes.post("/contest", contestController.create);
contestsRoutes.put("/contest/:id", contestController.updateFull);
contestsRoutes.patch("/contest/:id", contestController.updatePartial);
contestsRoutes.delete("/contest/:id", contestController.delete);

export { contestsRoutes };
