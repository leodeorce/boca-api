import { Router } from "express";

import { contestsRoutes } from "./contests.routes";

const router = Router();

router.use("/api/contests", contestsRoutes);

export { router };
