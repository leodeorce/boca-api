import { Router } from "express";

import { AuthController } from "../useCases/Auth/AuthController";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.get("/token", authController.getToken);

export { authRoutes };
