import { Router } from "express";

import { ContestController } from "../useCases/Contest/ContestController";

const contestsRoutes = Router();

const contestController = new ContestController();

contestsRoutes.get("/contests", contestController.listAll);
contestsRoutes.get("/contests/:id", contestController.getOne);
contestsRoutes.post("/contests", contestController.create);
contestsRoutes.put("/contests/:id", contestController.update);
contestsRoutes.delete("/contests/:id", contestController.delete);

export { contestsRoutes };
