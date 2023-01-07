import { Router } from "express";

import { AnswerController } from "../useCases/Answer/AnswerController";

const AnswersRoutes = Router();

const answerController = new AnswerController();

AnswersRoutes.get("/contest/:id_c/answer", answerController.listAll);
AnswersRoutes.post("/contest/:id_c/answer", answerController.create);
AnswersRoutes.get("/contest/:id_c/answer/:id_a", answerController.getOne);
AnswersRoutes.put("/contest/:id_c/answer/:id_a", answerController.update);
AnswersRoutes.delete("/contest/:id_c/answer/:id_a", answerController.delete);

export { AnswersRoutes };
