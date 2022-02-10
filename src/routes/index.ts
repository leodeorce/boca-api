import { Router } from "express";

import { AnswersRoutes } from "./answers.routes";
import { contestsRoutes } from "./contests.routes";
import { langRoutes } from "./lang.routes";
import { problemsRoutes } from "./problems.routes";
import { runsRoutes } from "./runs.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/api/contests", contestsRoutes);
router.use("/api", userRoutes);
router.use("/api", problemsRoutes);
router.use("/api", runsRoutes);
router.use("/api/problem", langRoutes);
router.use("/api", AnswersRoutes);

export { router };
