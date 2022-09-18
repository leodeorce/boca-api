import { Router } from "express";

import { AnswersRoutes } from "./answers.routes";
import { contestsRoutes } from "./contests.routes";
import { healthCheckRoutes } from "./healthCheck.routes";
import { langRoutes } from "./lang.routes";
import { problemsRoutes } from "./problems.routes";
import { runsRoutes } from "./runs.routes";
import { sitesRoutes } from "./sites.routes";
import { usersRoutes } from "./users.routes";
import { workingsRoutes } from "./working.routes";

const router = Router();

router.use("/api", AnswersRoutes);
router.use("/api/contests", contestsRoutes);
router.use("/api/health", healthCheckRoutes);
router.use("/api", langRoutes);
router.use("/api", problemsRoutes);
router.use("/api", runsRoutes);
router.use("/api", sitesRoutes);
router.use("/api", usersRoutes);
router.use("/api", workingsRoutes);

export { router };
