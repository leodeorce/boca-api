import { Router } from "express";

import { UserWorkingController } from "../useCases/UserWorking/UserWorkingController";
import { WorkingController } from "../useCases/Working/WorkingController";

const workingsRoutes = Router();

const workingController = new WorkingController();
const workingUsersController = new UserWorkingController();

workingsRoutes.get("/contest/:id_c/working", workingController.listAll);
workingsRoutes.post("/contest/:id_c/working", workingController.create);
workingsRoutes.put("/working/:id_working", workingController.update);
workingsRoutes.delete("/working/:id_working", workingController.delete);

workingsRoutes.post(
  "/working/:id_working/user",
  workingUsersController.addUsersToWorking
); // Adiciona workings à usuário
workingsRoutes.post(
  "/user/:id_user/working",
  workingUsersController.addWorkingToUsers
); // Adiciona usuarios à working

workingsRoutes.get(
  "/user/:id_user/working",
  workingUsersController.listWorkingsByUser
);
workingsRoutes.get(
  "/working/:id_working/user",
  workingUsersController.listUsersByWorking
);

workingsRoutes.delete(
  "/user/:id_user/working",
  workingUsersController.deleteUserFromWorkings
);
workingsRoutes.delete(
  "/working/:id_working/user",
  workingUsersController.deleteWorkingFromUsers
);

export { workingsRoutes };
