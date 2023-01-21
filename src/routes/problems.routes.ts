import { Router } from "express";
import fileUpload from "express-fileupload";

import { authenticate } from "../middleware";

import { UserType } from "../shared/definitions/UserType";

import { ProblemController } from "../useCases/Problem/ProblemController";

const problemsRoutes = Router();

const problemController = new ProblemController();

problemsRoutes.get(
  "/contest/:id_c/problem",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas Problems do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas Problems do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas Problems do Contest ao qual o judge pertence
  ]),
  problemController.listAll
);

problemsRoutes.get(
  "/contest/:id_c/problem/:id_p",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas um Problem do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas um Problem do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas um Problem do Contest ao qual o judge pertence
  ]),
  problemController.getOne
);

problemsRoutes.put(
  "/contest/:id_c/problem/:id_p",
  authenticate([
    UserType.ADMIN, // TODO Deve atualizar apenas Problems do Contest ao qual o admin pertence
  ]),
  problemController.update
);

problemsRoutes.delete(
  "/contest/:id_c/problem/:id_p",
  authenticate([
    UserType.ADMIN, // TODO Deve deletar apenas Problems do Contest ao qual o admin pertence
  ]),
  problemController.delete
);

problemsRoutes.get(
  "/contest/:id_c/problem/:id_p/file",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas arquivos de Problems do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas arquivos de Problems do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas arquivos de Problems do Contest ao qual o judge pertence
  ]),
  problemController.getFile
);

problemsRoutes.post(
  "/contest/:id_c/problem",
  authenticate([
    UserType.ADMIN, // TODO Deve criar Problems apenas no Contest ao qual o admin pertence
  ]),
  problemController.create
);

problemsRoutes.put(
  "/contest/:id_c/problem/:id_p/file",
  fileUpload(),
  authenticate([
    UserType.ADMIN, // TODO Deve atualizar arquivos apenas de Problems do Contest ao qual o admin pertence
  ]),
  problemController.updateFile
);

export { problemsRoutes };
