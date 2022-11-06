import { Router } from "express";

import { UserController } from "../useCases/User/UserController";

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.get("/contest/:id_c/site/:id_s/user", userController.listAll);
usersRoutes.post("/contest/:id_c/site/:id_s/user", userController.create);

usersRoutes.get(
  "/contest/:id_c/site/:id_s/user/:id_user",
  userController.getOne
);

usersRoutes.put(
  "/contest/:id_c/site/:id_s/user/:id_user",
  userController.updateFull
);

usersRoutes.patch(
  "/contest/:id_c/site/:id_s/user/:id_user",
  userController.updatePartial
);

usersRoutes.delete(
  "/contest/:id_c/site/:id_s/user/:id_user",
  userController.delete
);

export { usersRoutes };
