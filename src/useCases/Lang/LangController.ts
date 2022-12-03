import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import IdValidator from "../../shared/validation/utils/IdValidator";
import { CreateLangUseCase } from "./CreateLangUseCase";
import { DeleteLangUseCase } from "./DeleteLangUseCase";
import { GetLangUseCase } from "./GetLangUseCase";
import { ListLangUseCase } from "./ListLangUseCase";
import { PatchLangUseCase } from "./PatchLangUseCase";
import { ReplaceLangUseCase } from "./ReplaceLangUseCase";

class LangController {
  async getOne(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const getLangUseCase = container.resolve(GetLangUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_l } = request.params;
    const contestnumber = Number(id_c);
    const langnumber = Number(id_l);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isLangId(langnumber);

      const lang = await getLangUseCase.execute({
        contestnumber,
        langnumber,
      });

      return response.status(200).json(lang);
    } catch (error) {
      next(error);
    }
  }

  async listAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const listLangUseCase = container.resolve(ListLangUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    try {
      idValidator.isContestId(contestnumber);

      const all = await listLangUseCase.execute({ contestnumber });

      return response.status(200).json(all);
    } catch (error) {
      next(error);
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const createLangUseCase = container.resolve(CreateLangUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    const { langname, langextension } = request.body;

    try {
      idValidator.isContestId(contestnumber);

      const lang = await createLangUseCase.execute({
        contestnumber,
        langname,
        langextension,
      });

      return response.status(200).json(lang);
    } catch (error) {
      next(error);
    }
  }

  async updateFull(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const replaceLangUseCase = container.resolve(ReplaceLangUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_l } = request.params;
    const contestnumber = Number(id_c);
    const langnumber = Number(id_l);

    const { langname, langextension } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isLangId(langnumber);

      const updatedLang = await replaceLangUseCase.execute({
        contestnumber,
        langnumber,
        langname,
        langextension,
      });

      return response.status(200).json(updatedLang);
    } catch (error) {
      next(error);
    }
  }

  async updatePartial(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const patchLangUseCase = container.resolve(PatchLangUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_l } = request.params;
    const contestnumber = Number(id_c);
    const langnumber = Number(id_l);

    const { langname, langextension } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isLangId(langnumber);

      const updatedLang = await patchLangUseCase.execute({
        contestnumber,
        langnumber,
        langname,
        langextension,
      });

      return response.status(200).json(updatedLang);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const deleteLangUseCase = container.resolve(DeleteLangUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_l } = request.params;
    const contestnumber = Number(id_c);
    const langnumber = Number(id_l);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isLangId(langnumber);

      await deleteLangUseCase.execute({ contestnumber, langnumber });

      return response.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export { LangController };
