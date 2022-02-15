import { Router } from "express";

import { UserController } from "../useCases/User/UserController";

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.get("/problem/:id_p/user", userController.listAll);
usersRoutes.post("/problem/:id_p/user", userController.create);
usersRoutes.get("/user/:id_user", userController.getOne);
usersRoutes.put("/user/:id_user", userController.update);
usersRoutes.delete("/user/:id_user", userController.delete);

export { usersRoutes };
