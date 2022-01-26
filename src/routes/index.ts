import { Router } from "express";

import { contestsRoutes } from "./contests.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/api/contests", contestsRoutes);
router.use("/api", userRoutes);

export { router };
