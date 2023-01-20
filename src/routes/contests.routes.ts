import { Router } from "express";
import { authenticate } from "../middleware";
import { UserType } from "../shared/definitions/UserType";

import { ContestController } from "../useCases/Contest/ContestController";

const contestsRoutes = Router();

const contestController = new ContestController();

contestsRoutes.get("/contest", contestController.listAll);
contestsRoutes.get("/contest/:id_c", contestController.getOne);
contestsRoutes.put("/contest/:id_c", contestController.update);
contestsRoutes.delete("/contest/:id_c", contestController.delete);

contestsRoutes.post(
  "/contest",
  authenticate([UserType.SYSTEM]),
  contestController.create
);

export { contestsRoutes };
