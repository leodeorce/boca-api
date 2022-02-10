import { Router } from "express";

import { AnswerController } from "../useCases/Answer/AnswerController";

const AnswersRoutes = Router();

const answerController = new AnswerController();

AnswersRoutes.get("/contest/:id_c/answer", answerController.listAll);
AnswersRoutes.post("/contest/:id_c/answer", answerController.create);

AnswersRoutes.get("/answer/:id_answer", answerController.getOne);
AnswersRoutes.put("/answer/:id_answer", answerController.update);
AnswersRoutes.delete("/answer/:id_answer", answerController.delete);

export { AnswersRoutes };
