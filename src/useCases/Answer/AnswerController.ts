import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import IdValidator from "../../shared/validation/utils/IdValidator";

import { CreateAnswerUseCase } from "./CreateAnswerUseCase";
import { DeleteAnswerUseCase } from "./DeleteAnswerUseCase";
import { GetAnswerUseCase } from "./GetAnswerUseCase";
import { ListAnswersUseCase } from "./ListAnswersUseCase";
import { PatchAnswerUseCase } from "./PatchAnswerUseCase";
import { ReplaceAnswerUseCase } from "./ReplaceAnswerUseCase";

class AnswerController {
  async listAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const listAnswersUseCase = container.resolve(ListAnswersUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    try {
      idValidator.isContestId(contestnumber);

      const all = await listAnswersUseCase.execute({ contestnumber });

      return response.status(200).json(all);
    } catch (error) {
      next(error);
    }
  }

  async getOne(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const getAnswerUseCase = container.resolve(GetAnswerUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_a } = request.params;
    const contestnumber = Number(id_c);
    const answernumber = Number(id_a);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isAnswerId(answernumber);

      const answer = await getAnswerUseCase.execute({
        contestnumber,
        answernumber,
      });

      return response.status(200).json(answer);
    } catch (error) {
      next(error);
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const createAnswerUseCase = container.resolve(CreateAnswerUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    const { answernumber, fake, runanswer, yes } = request.body;

    try {
      idValidator.isContestId(contestnumber);

      const contest = await createAnswerUseCase.execute({
        contestnumber,
        answernumber,
        fake,
        runanswer,
        yes,
      });

      return response.status(200).json(contest);
    } catch (error) {
      next(error);
    }
  }

  async updateFull(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const replaceAnswerUseCase = container.resolve(ReplaceAnswerUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_a } = request.params;
    const contestnumber = Number(id_c);
    const answernumber = Number(id_a);

    const { fake, runanswer, yes } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isAnswerId(answernumber);

      const updatedAnswer = await replaceAnswerUseCase.execute({
        contestnumber,
        answernumber,
        fake,
        runanswer,
        yes,
      });

      return response.status(200).json(updatedAnswer);
    } catch (error) {
      next(error);
    }
  }

  async updatePartial(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const patchAnswerUseCase = container.resolve(PatchAnswerUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_a } = request.params;
    const contestnumber = Number(id_c);
    const answernumber = Number(id_a);

    const { fake, runanswer, yes } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isAnswerId(answernumber);

      const updatedAnswer = await patchAnswerUseCase.execute({
        contestnumber,
        answernumber,
        fake,
        runanswer,
        yes,
      });

      return response.status(200).json(updatedAnswer);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const deleteAnswerUseCase = container.resolve(DeleteAnswerUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_a } = request.params;
    const contestnumber = Number(id_c);
    const answernumber = Number(id_a);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isAnswerId(answernumber);

      await deleteAnswerUseCase.execute({ contestnumber, answernumber });

      return response.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export { AnswerController };
