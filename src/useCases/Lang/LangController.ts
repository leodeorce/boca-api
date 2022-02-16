import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import { GetContestsUseCase } from "../Contest/GetContestUseCase";
import { CreateLangUseCase } from "./CreateLangUseCase";
import { DeleteLangUseCase } from "./DeleteLangUseCase";
import { GetLangUseCase } from "./GetLangUseCase";
import { ListLangUseCase } from "./ListLangUseCase";
import { UpdateLangUseCase } from "./UpdateLangUseCase";

class LangController {

  async getOne(request: Request, response: Response): Promise<Response> {
    const getLangUseCase = container.resolve(GetLangUseCase);

    const { id_language } = request.params;
    try {
      const language = await getLangUseCase.execute({id: parseInt(id_language, 10)});
      return response.json(language)
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async listAll(request: Request, response: Response): Promise<Response> {
    const listLangUseCase = container.resolve(ListLangUseCase);

    const { id_c } = request.params;

    try {
      const all = await listLangUseCase.execute(parseInt(id_c, 10));
      return response.json(all);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

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

  async update(request: Request, response: Response): Promise<Response> {
    const updateLangUseCase = container.resolve(UpdateLangUseCase);
    const getLangUseCase = container.resolve(GetLangUseCase);

    const { id_language } = request.params;

    const { contestnumber, langname, langextension } = request.body;

    const language = await getLangUseCase.execute({ id: parseInt(id_language, 10) });

    if (!language) {
      throw new Error("Language not found");
    }

    try {
      await updateLangUseCase.execute({
        contestnumber,
        langname,
        langextension,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error Updating Language" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id_lang } = request.params;
    const idNumber = parseInt(id_lang, 10);
    const deleteLangUseCase = container.resolve(DeleteLangUseCase);

    try {
      await deleteLangUseCase.execute({ id: idNumber });
      return response
        .status(200)
        .json({ message: "Language deleted successfully" });
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }
}
export { LangController };
