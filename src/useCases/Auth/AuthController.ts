import "reflect-metadata";

import { container } from "tsyringe";
import { NextFunction, Request, Response } from "express";

import { GenerateTokenUseCase } from "./GenerateTokenUseCase";

class AuthController {
  async getToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const generateTokenUseCase = container.resolve(GenerateTokenUseCase);

    const name = request.query.name as string;
    const password = request.query.password as string;

    try {
      const token = await generateTokenUseCase.execute({
        name,
        saltedPassword: password,
      });

      return response.status(200).json({ accessToken: token });
    } catch (error) {
      next(error);
    }
  }
}

export { AuthController };
