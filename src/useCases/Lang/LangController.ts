import "reflect-metadata";

import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { LangRequestValidator } from "../../shared/validation/requests/LangRequestValidator";
import IdValidator from "../../shared/validation/utils/IdValidator";

import { CreateLangUseCase } from "./CreateLangUseCase";
import { DeleteLangUseCase } from "./DeleteLangUseCase";
import { GetLangUseCase } from "./GetLangUseCase";
import { ListLangUseCase } from "./ListLangUseCase";
import { UpdateLangUseCase } from "./UpdateLangUseCase";
import { HttpStatus } from "../../shared/definitions/HttpStatusCodes";

class LangController {
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

      return response.status(HttpStatus.SUCCESS).json(all);
    } catch (error) {
      next(error);
    }
  }

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

      return response.status(HttpStatus.SUCCESS).json(lang);
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
    const langRequestValidator = container.resolve(LangRequestValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    const { langname, langextension } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      langRequestValidator.hasRequiredCreateProperties(request.body);

      const lang = await createLangUseCase.execute({
        contestnumber,
        langname,
        langextension,
      });

      return response.status(HttpStatus.CREATED).json(lang);
    } catch (error) {
      next(error);
    }
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const updateLangUseCase = container.resolve(UpdateLangUseCase);
    const idValidator = container.resolve(IdValidator);
    const langRequestValidator = container.resolve(LangRequestValidator);

    const { id_c } = request.params;
    const { id_l } = request.params;
    const contestnumber = Number(id_c);
    const langnumber = Number(id_l);

    const { langname, langextension } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isLangId(langnumber);
      langRequestValidator.hasRequiredUpdateProperties(request.body);

      const updatedLang = await updateLangUseCase.execute({
        contestnumber,
        langnumber,
        langname,
        langextension,
      });

      return response.status(HttpStatus.UPDATED).json(updatedLang);
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

      return response.status(HttpStatus.DELETED).json();
    } catch (error) {
      next(error);
    }
  }
}

export { LangController };
