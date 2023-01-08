import { Router } from "express";
import fileUpload from "express-fileupload";

import { ProblemController } from "../useCases/Problem/ProblemController";

const problemsRoutes = Router();

const problemController = new ProblemController();

problemsRoutes.get("/contest/:id_c/problem", problemController.listAll);
problemsRoutes.get("/contest/:id_c/problem/:id_p", problemController.getOne);
problemsRoutes.put("/contest/:id_c/problem/:id_p", problemController.update);
problemsRoutes.delete("/contest/:id_c/problem/:id_p", problemController.delete);

problemsRoutes.get(
  "/contest/:id_c/problem/:id_p/file",
  problemController.getFile
);

problemsRoutes.post(
  "/contest/:id_c/problem",
  problemController.create
);

problemsRoutes.put(
  "/contest/:id_c/problem/:id_p/file",
  fileUpload(),
  problemController.updateFile
);

export { problemsRoutes };
