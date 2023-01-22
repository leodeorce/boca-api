import { Router } from "express";

import { authenticate } from "../middleware";

import { UserType } from "../shared/definitions/UserType";

import { AnswerController } from "../useCases/Answer/AnswerController";

const AnswersRoutes = Router();

const answerController = new AnswerController();

AnswersRoutes.get(
  "/contest/:id_c/answer",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas Answers do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas Answers do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas Answers do Contest ao qual o judge pertence
  ]),
  answerController.listAll
);
AnswersRoutes.get(
  "/contest/:id_c/answer/:id_a",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas uma Answer do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas uma Answer do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas uma Answer do Contest ao qual o judge pertence
  ]),
  answerController.getOne
);
AnswersRoutes.post(
  "/contest/:id_c/answer",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas Answers do Contest ao qual o admin pertence
  ]),
  answerController.create
);
AnswersRoutes.put(
  "/contest/:id_c/answer/:id_a",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas Answers do Contest ao qual o admin pertence
  ]),
  answerController.update
);
AnswersRoutes.delete(
  "/contest/:id_c/answer/:id_a",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas Answers do Contest ao qual o admin pertence
  ]),
  answerController.delete
);

export { AnswersRoutes };
