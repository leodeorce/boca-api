import { Router } from "express";

import { ProblemController } from "../useCases/Problem/ProblemController";

const problemsRoutes = Router();

const problemController = new ProblemController();

problemsRoutes.get("/contest/:id_c/problem", problemController.listAll);
problemsRoutes.post("/contest/:id_c/problem", problemController.create);

problemsRoutes.get("/problem/:id_problem", problemController.getOne);
problemsRoutes.put("/problem/:id_problem", problemController.update);
problemsRoutes.delete("/problem/:id_problem", problemController.delete);

export { problemsRoutes };
