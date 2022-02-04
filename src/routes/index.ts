import { Router } from "express";

import { contestsRoutes } from "./contests.routes";
import { problemsRoutes } from "./problems.routes";
import { runsRoutes } from "./runs.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/api/contests", contestsRoutes);
router.use("/api", userRoutes);
router.use("/api", problemsRoutes);
router.use("/api", runsRoutes);

export { router };
