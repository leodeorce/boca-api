import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { QueryFailedError } from "typeorm";

import { AddLanguagesToProblemUseCase } from "./AddLanguagesToProblemUseCase";
import { DeleteLanguagesFromProblemUseCase } from "./DeleteLanguagesFromProblemUseCase";
import { ListLanguagesByProblemUseCase } from "./ListLanguagesByProblemUseCase";

class ProblemLanguageController {
  async listLanguagesByProblem(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listLanguagesByProblem = container.resolve(
      ListLanguagesByProblemUseCase
    );

    const { id_problem } = request.params;

    try {
      const languages = await listLanguagesByProblem.execute(
        parseInt(id_problem, 10)
      );
      return response.json(languages);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error getting Languages" });
    }
  }

  async addLanguagesToProblem(
    request: Request,
    response: Response
  ): Promise<Response> {
    const addLanguagesToProblemUseCase = container.resolve(
      AddLanguagesToProblemUseCase
    );

    const { id_problem } = request.params;
    const { contestnumber, langnumbers } = request.body;

    try {
      await addLanguagesToProblemUseCase.execute({
        contestnumber,
        langnumbers,
        problemnumber: parseInt(id_problem, 10),
      });
      return response.status(201).send();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response
        .status(400)
        .json({ error: "Error adding Languages to Problem" });
    }
  }

  async deleteLanguagesFromProblem(
    request: Request,
    response: Response
  ): Promise<Response> {
    const deleteLanguagesFromProblem = container.resolve(
      DeleteLanguagesFromProblemUseCase
    );

    const { id_problem } = request.params;
    const { contestnumber, langnumbers } = request.body;

    try {
      await deleteLanguagesFromProblem.execute({
        contestnumber,
        langnumbers,
        problemnumber: parseInt(id_problem, 10),
      });

      return response.status(204).send();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response
        .status(400)
        .json({ error: "Error deleting Languages from Problem" });
    }
  }
}

export { ProblemLanguageController };
