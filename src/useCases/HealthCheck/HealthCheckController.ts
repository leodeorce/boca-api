import { Request, Response } from "express";

class HealthCheckController {
  async ready(request: Request, response: Response): Promise<Response> {
    return response.status(200).send();
  }
}

export { HealthCheckController };
