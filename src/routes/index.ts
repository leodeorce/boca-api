import { Router } from "express";

import { AnswersRoutes } from "./answers.routes";
import { contestsRoutes } from "./contests.routes";
import { langRoutes } from "./lang.routes";
import { problemsRoutes } from "./problems.routes";
import { runsRoutes } from "./runs.routes";
import { sitesRoutes } from "./sites.routes";
import { usersRoutes } from "./users.routes";


const router = Router();

router.use("/api/contests", contestsRoutes);
router.use("/api", usersRoutes);
router.use("/api", problemsRoutes);
router.use("/api", runsRoutes);
router.use("/api", AnswersRoutes);
router.use("/api", langRoutes);
router.use("/api", sitesRoutes)

export { router };
