import { Router } from "express";

import { UserController } from "../useCases/User/UserController";

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.get("/contest/:id_c/user", userController.listAll);
usersRoutes.post("/contest/:id_c/user", userController.create);
usersRoutes.get("/user/:id_user", userController.getOne);
usersRoutes.put("/user/:id_user", userController.update);
usersRoutes.delete("/user/:id_user", userController.delete);

export { usersRoutes };
