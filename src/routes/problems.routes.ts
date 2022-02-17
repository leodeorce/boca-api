import { Router } from "express";

import { ProblemController } from "../useCases/Problem/ProblemController";
import { ProblemLanguageController } from "../useCases/ProblemLanguage/ProblemLanguageController";

const problemsRoutes = Router();

const problemController = new ProblemController();
const problemLanguageController = new ProblemLanguageController();

problemsRoutes.get("/contest/:id_c/problem", problemController.listAll);
problemsRoutes.post("/contest/:id_c/problem", problemController.create);

problemsRoutes.get("/problem/:id_problem", problemController.getOne);
problemsRoutes.put("/problem/:id_problem", problemController.update);
problemsRoutes.delete("/problem/:id_problem", problemController.delete);

// Rotas de link com as linguagens

problemsRoutes.get(
  "/problem/:id_problem/language",
  problemLanguageController.listLanguagesByProblem
);
problemsRoutes.post(
  "/problem/:id_problem/language",
  problemLanguageController.addLanguagesToProblem
);
problemsRoutes.delete(
  "/problem/:id_problem/language",
  problemLanguageController.deleteLanguagesFromProblem
);

export { problemsRoutes };
