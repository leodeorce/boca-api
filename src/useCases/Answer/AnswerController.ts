import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
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

    const { id_c } = request.params;

    try {
      const all = await listAnswersUseCase.execute(parseInt(id_c, 10));
      return response.json(all);
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
    const { id_answer } = request.params;

    try {
      const answer = await getAnswerUseCase.execute({
        id: parseInt(id_answer, 10),
      });
      return response.json(answer);
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
      idValidator.isAnswerId(contestnumber);

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

  async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const updateAnswerUseCase = container.resolve(UpdateAnswerUseCase);

    const { id_answer } = request.params;

    const { contestnumber, fake, runanswer, yes } = request.body;

    try {
      await updateAnswerUseCase.execute({
        answernumber: parseInt(id_answer, 10),
        contestnumber,
        fake,
        runanswer,
        yes,
      });

      return response.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const { id_answer } = request.params;
    const idNumber = parseInt(id_answer, 10);
    const deleteAnswerUseCase = container.resolve(DeleteAnswerUseCase);

    try {
      await deleteAnswerUseCase.execute({ id: idNumber });
      return response
        .status(200)
        .json({ message: "Answer deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export { AnswerController };
