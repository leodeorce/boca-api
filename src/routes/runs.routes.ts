import { Router } from "express";
import fileUpload from "express-fileupload";

import { authenticate } from "../middleware";

import { UserType } from "../shared/definitions/UserType";

import { RunController } from "../useCases/Run/RunController";

const runsRoutes = Router();

const runController = new RunController();

runsRoutes.get(
  "/contest/:id_c/problem/:id_p/run",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas Runs do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas Runs do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas Runs do Contest ao qual o judge pertence
  ]),
  runController.listAll
);

runsRoutes.get(
  "/contest/:id_c/problem/:id_p/run/:id_r",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas uma Run do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas uma Run do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas uma Run do Contest ao qual o judge pertence
  ]),
  runController.getOne
);

runsRoutes.get(
  "/contest/:id_c/problem/:id_p/run/:id_r/file",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas o arquivo de Runs do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas o arquivo de Runs do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas o arquivo de Runs do Contest ao qual o judge pertence
  ]),
  runController.getFile
);

runsRoutes.post(
  "/contest/:id_c/problem/:id_p/run",
  fileUpload(),
  authenticate([
    UserType.TEAM, // TODO Deve criar Runs apenas no Contest ao qual o team pertence
  ]),
  runController.create
);

runsRoutes.put(
  "/contest/:id_c/problem/:id_p/run/:id_r",
  authenticate([
    UserType.ADMIN, // TODO Deve atualizar apenas Runs do Contest ao qual o admin pertence
    UserType.JUDGE, // TODO Deve atualizar apenas Runs do Contest ao qual o judge pertence
  ]),
  runController.update
);

runsRoutes.delete(
  "/contest/:id_c/problem/:id_p/run/:id_r",
  authenticate([
    UserType.ADMIN, // TODO Deve deletar apenas Runs do Contest ao qual o admin pertence
  ]),
  runController.delete
);

// TODO Criar endpoints que gerenciam Runs no contexto de Users e não Problems. Ex: GET em /contest/:id_c/user/:id_u/run

export { runsRoutes };
