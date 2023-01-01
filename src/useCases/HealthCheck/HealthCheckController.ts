import { Request, Response } from "express";

import { HttpStatus } from "../../shared/definitions/HttpStatusCodes";

class HealthCheckController {
  async ready(request: Request, response: Response): Promise<Response> {
    return response.status(HttpStatus.SUCCESS).send();
  }
}

export { HealthCheckController };
