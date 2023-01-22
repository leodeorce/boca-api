import { Router } from "express";

import { authenticate } from "../middleware";

import { UserType } from "../shared/definitions/UserType";

import { SiteController } from "../useCases/Site/SiteController";

const sitesRoutes = Router();

const siteController = new SiteController();

sitesRoutes.get(
  "/contest/:id_c/site",
  authenticate([
    UserType.ADMIN, // TODO Deve apenas receber os Sites para o Contest ao qual pertence
    UserType.SYSTEM, // Deve ser capaz de receber Sites de quaisquer Contests
  ]),
  siteController.listAll
);

sitesRoutes.post(
  "/contest/:id_c/site",
  authenticate([
    UserType.ADMIN, // TODO Deve ser capaz de criar Sites somente no Contest ao qual pertence
    UserType.SYSTEM, // Deve ser capaz de criar Sites para quaisquer Contests
  ]),
  siteController.create
);

sitesRoutes.get(
  "/contest/:id_c/site/:id_s",
  authenticate([
    UserType.ADMIN, // TODO Deve apenas receber um Site do Contest ao qual o admin pertence
    UserType.SYSTEM, // Deve ser capaz de receber um Site de qualquer Contest
  ]),
  siteController.getOne
);

sitesRoutes.put(
  "/contest/:id_c/site/:id_s",
  authenticate([
    UserType.ADMIN, // TODO Deve atualizar somente Sites do Contest ao qual o admin pertence
    UserType.SYSTEM, // Deve ser capaz de atualizar Sites de quaisquer Contests
  ]),
  siteController.update
);

sitesRoutes.delete(
  "/contest/:id_c/site/:id_s",
  authenticate([
    UserType.ADMIN, // TODO Deve ser capaz de deletar somente Sites do Contest ao qual o admin pertence
    UserType.SYSTEM, // Deve ser capaz de deletar Sites de quaisquer Contests
  ]),
  siteController.delete
);

export { sitesRoutes };
