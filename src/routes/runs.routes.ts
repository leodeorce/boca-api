import { Router } from "express";
import fileUpload from "express-fileupload";

import { RunController } from "../useCases/Run/RunController";

const runsRoutes = Router();

const runController = new RunController();

runsRoutes.get("contest/:id_c/problem/:id_p/run", runController.listAll);
runsRoutes.get("contest/:id_c/problem/:id_p/run/:id_r", runController.getOne);
runsRoutes.put("contest/:id_c/problem/:id_p/run/:id_r", runController.update);

runsRoutes.post(
  "contest/:id_c/problem/:id_p/run",
  fileUpload(),
  runController.create
);

runsRoutes.delete(
  "contest/:id_c/problem/:id_p/run/:id_r",
  runController.delete
);

runsRoutes.get(
  "contest/:id_c/problem/:id_p/run/:id_r/file",
  runController.getFile
);

export { runsRoutes };
