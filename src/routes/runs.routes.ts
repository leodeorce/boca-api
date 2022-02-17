import { Router } from "express";

import { RunController } from "../useCases/Run/RunController";

const runsRoutes = Router();

const runController = new RunController();

runsRoutes.get("/problem/:id_p/run", runController.listAll);
runsRoutes.post("/problem/:id_p/run", runController.create);
runsRoutes.get("/run/:id_run", runController.getOne);
runsRoutes.put("/run/:id_run", runController.update);
runsRoutes.delete("/run/:id_run", runController.delete);

export { runsRoutes };
