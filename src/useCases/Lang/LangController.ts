import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import { GetContestsUseCase } from "../Contest/GetContestUseCase";
import { CreateLangUseCase } from "./CreateLangUseCase";

class LangController {
  async create(request: Request, response: Response): Promise<Response> {
    const createLangUseCase = container.resolve(CreateLangUseCase);
    const getContestUseCase = container.resolve(GetContestsUseCase);

    const { id_c } = request.params;

    const { langname, langextension } = request.body;

    const contest = await getContestUseCase.execute({ id: parseInt(id_c, 10) });

    if (!contest) {
      throw new Error("Contest not found");
    }

    try {
      await createLangUseCase.execute({
        contestnumber: contest.contestnumber,
        langname,
        langextension,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error creating Language" });
    }
  }
}
export { LangController };
