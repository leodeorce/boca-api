import { Router } from "express";

import { contestsRoutes } from "./contests.routes";

const router = Router();

router.use("/contests", contestsRoutes);

export { router };
