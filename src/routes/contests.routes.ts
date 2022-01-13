import { Router } from "express";

import { ContestController } from "../useCases/Contest/ContestController";

const contestsRoutes = Router();

const contestController = new ContestController();

contestsRoutes.get("/", contestController.listAll);
contestsRoutes.get("/:id", contestController.getOne);
contestsRoutes.post("/", contestController.create);
contestsRoutes.put("/:id", contestController.update);
contestsRoutes.delete("/:id", contestController.delete);

export { contestsRoutes };
