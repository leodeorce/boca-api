import { Router } from "express";
import { authenticate } from "../middleware";
import { UserType } from "../shared/definitions/UserType";

import { ContestController } from "../useCases/Contest/ContestController";

const contestsRoutes = Router();

const contestController = new ContestController();

contestsRoutes.get(
  "/contest",
  authenticate([
    UserType.SYSTEM, // Deve receber todos os Contests
    UserType.ADMIN, // TODO Deve apenas receber o Contest ao qual pertence
    UserType.JUDGE, // TODO Deve apenas receber o Contest ao qual pertence
    UserType.TEAM, // TODO Deve apenas receber o Contest ao qual pertence
  ]),
  contestController.listAll
);

contestsRoutes.get(
  "/contest/:id_c",
  authenticate([
    UserType.SYSTEM, // Deve receber o Contest solicitado sempre
    UserType.ADMIN, // TODO Deve apenas receber o Contest solicitado se pertencer ao mesmo
    UserType.JUDGE, // TODO Deve apenas receber o Contest solicitado se pertencer ao mesmo
    UserType.TEAM, // TODO Deve apenas receber o Contest solicitado se pertencer ao mesmo
  ]),
  contestController.getOne
);

contestsRoutes.put(
  "/contest/:id_c",
  authenticate([
    UserType.SYSTEM, // Único capaz de editar um Contest // TODO Validar
  ]),
  contestController.update
);

contestsRoutes.delete(
  "/contest/:id_c",
  authenticate([
    UserType.SYSTEM, // Único capaz de deletar um Contest // TODO Validar
  ]),
  contestController.delete
);

contestsRoutes.post(
  "/contest",
  authenticate([
    UserType.SYSTEM, // Único capaz de criar um Contest
  ]),
  contestController.create
);

export { contestsRoutes };
