import { Router } from "express";

import { authenticate } from "../middleware";

import { UserType } from "../shared/definitions/UserType";

import { UserController } from "../useCases/User/UserController";

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.get(
  "/contest/:id_c/site/:id_s/user",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas Users do Contest ao qual o admin pertence
  ]),
  userController.listAll
);

usersRoutes.post(
  "/contest/:id_c/site/:id_s/user",
  authenticate([
    UserType.ADMIN, // TODO Deve criar Users apenas no Contest ao qual o admin pertence
    UserType.SYSTEM, // Deve criar quaisquer Users
  ]),
  userController.create
);

usersRoutes.get(
  "/contest/:id_c/site/:id_s/user/:id_u",
  authenticate([
    UserType.ADMIN, // TODO Deve resgatar apenas um User do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve resgatar apenas o próprio team
    UserType.JUDGE, // TODO Deve resgatar apenas o próprio judge
    UserType.SYSTEM, // TODO Deve resgatar apenas o próprio system
  ]),
  userController.getOne
);

usersRoutes.put(
  "/contest/:id_c/site/:id_s/user/:id_u",
  authenticate([
    UserType.ADMIN, // TODO Deve atualizar apenas Users do Contest ao qual o admin pertence
    UserType.TEAM, // TODO Deve atualizar apenas username, userfullname, userdesc, e userpassword
    UserType.JUDGE, // TODO Deve atualizar apenas username, userfullname, userdesc, e userpassword
    UserType.SYSTEM, // TODO Deve atualizar apenas username, userfullname, userdesc, e userpassword
  ]),
  userController.update
);

usersRoutes.delete(
  "/contest/:id_c/site/:id_s/user/:id_u",
  authenticate([
    UserType.ADMIN, // TODO Deve deletar apenas Users do Contest ao qual o admin pertence
  ]),
  userController.delete
);

export { usersRoutes };
