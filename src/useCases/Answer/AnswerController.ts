import "reflect-metadata";

import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { AnswerRequestValidator } from "../../shared/validation/requests/AnswerRequestValidator";
import { HttpStatus } from "../../shared/definitions/HttpStatusCodes";
import IdValidator from "../../shared/validation/utils/IdValidator";

import { CreateAnswerUseCase } from "./CreateAnswerUseCase";
import { DeleteAnswerUseCase } from "./DeleteAnswerUseCase";
import { GetAnswerUseCase } from "./GetAnswerUseCase";
import { ListAnswersUseCase } from "./ListAnswersUseCase";
import { UpdateAnswerUseCase } from "./UpdateAnswerUseCase";

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

      return response.status(HttpStatus.SUCCESS).json(answer);
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
    const answerRequestValidator = container.resolve(AnswerRequestValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    const { answernumber, fake, runanswer, yes } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      answerRequestValidator.hasRequiredCreateProperties(request.body);

      const contest = await createAnswerUseCase.execute({
        contestnumber,
        answernumber,
        fake,
        runanswer,
        yes,
      });

      return response.status(HttpStatus.CREATED).json(contest);
    } catch (error) {
      next(error);
    }
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const updateAnswerUseCase = container.resolve(UpdateAnswerUseCase);
    const idValidator = container.resolve(IdValidator);
    const answerRequestValidator = container.resolve(AnswerRequestValidator);

    const { id_c } = request.params;
    const { id_a } = request.params;
    const contestnumber = Number(id_c);
    const answernumber = Number(id_a);

    const { fake, runanswer, yes } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isAnswerId(answernumber);
      answerRequestValidator.hasRequiredUpdateProperties(request.body);

      const updatedAnswer = await updateAnswerUseCase.execute({
        contestnumber,
        answernumber,
        fake,
        runanswer,
        yes,
      });

      return response.status(HttpStatus.UPDATED).json(updatedAnswer);
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

      return response.status(HttpStatus.DELETED).json();
    } catch (error) {
      next(error);
    }
  }
}

export { AnswerController };
