import { Router } from "express";

import { HealthCheckController } from "../useCases/HealthCheck/HealthCheckController";

const healthCheckRoutes = Router();

const healthCheckController = new HealthCheckController();

healthCheckRoutes.get("/health", healthCheckController.ready);

export { healthCheckRoutes };
