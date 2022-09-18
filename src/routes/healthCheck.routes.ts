import { Router } from "express";

import { HealthCheckController } from "../useCases/HealthCheck/HealthCheckController";

const healthCheckRoutes = Router();

const healthCheckController = new HealthCheckController();

healthCheckRoutes.get("/", healthCheckController.ready);

export { healthCheckRoutes };
