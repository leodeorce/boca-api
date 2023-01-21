import { Router } from "express";

import { authenticate } from "../middleware";

import { UserType } from "../shared/definitions/UserType";

import { LangController } from "../useCases/Lang/LangController";

const langRoutes = Router();

const langController = new LangController();

langRoutes.get(
  "/contest/:id_c/language",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas Langs do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas Langs do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas Langs do Contest ao qual o judge pertence
  ]),
  langController.listAll
);

langRoutes.get(
  "/contest/:id_c/language/:id_l",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas uma Lang do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas uma Lang do Contest ao qual o team pertence
    UserType.JUDGE, // TODO Deve resgatar apenas uma Lang do Contest ao qual o judge pertence
  ]),
  langController.getOne
);

langRoutes.post(
  "/contest/:id_c/language",
  authenticate([
    UserType.ADMIN, // TODO Deve criar Langs apenas no Contest ao qual o admin pertence
  ]),
  langController.create
);

langRoutes.put(
  "/contest/:id_c/language/:id_l",
  authenticate([
    UserType.ADMIN, // TODO Deve atualizar apenas Langs do Contest ao qual o admin pertence
  ]),
  langController.update
);

langRoutes.delete(
  "/contest/:id_c/language/:id_l",
  authenticate([
    UserType.ADMIN, // TODO Deve deletar apenas Langs do Contest ao qual o admin pertence
  ]),
  langController.delete
);

export { langRoutes };
