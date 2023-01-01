import { Router } from "express";

import { UserController } from "../useCases/User/UserController";

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.get("/contest/:id_c/site/:id_s/user", userController.listAll);
usersRoutes.post("/contest/:id_c/site/:id_s/user", userController.create);

usersRoutes.get(
  "/contest/:id_c/site/:id_s/user/:id_u",
  userController.getOne
);

usersRoutes.put(
  "/contest/:id_c/site/:id_s/user/:id_u",
  userController.update
);

usersRoutes.delete(
  "/contest/:id_c/site/:id_s/user/:id_u",
  userController.delete
);

export { usersRoutes };
