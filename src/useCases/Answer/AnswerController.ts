import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import { GetContestsUseCase } from "../Contest/GetContestUseCase";
import { CreateAnswerUseCase } from "./CreateAnswerUseCase";
import { DeleteAnswerUseCase } from "./DeleteAnswerUseCase";
import { GetAnswerUseCase } from "./GetAnswerUseCase";
import { ListAnswersUseCase } from "./ListAnswersUseCase";
import { UpdateAnswerUseCase } from "./UpdateAnswerUseCase";

class AnswerController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const listAnswersUseCase = container.resolve(ListAnswersUseCase);

    const { id_c } = request.params;

    try {
      const all = await listAnswersUseCase.execute(parseInt(id_c, 10));
      return response.json(all);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const getAnswerUseCase = container.resolve(GetAnswerUseCase);
    const { id_answer } = request.params;

    try {
      const answer = await getAnswerUseCase.execute({
        id: parseInt(id_answer, 10),
      });
      return response.json(answer);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createAnswerUseCase = container.resolve(CreateAnswerUseCase);
    const getContestUseCase = container.resolve(GetContestsUseCase);

    const { id_c } = request.params;

    const { fake, runanswer, yes } = request.body;

    const contest = await getContestUseCase.execute({ id: parseInt(id_c, 10) });

    if (!contest) {
      throw new Error("Contest not found");
    }

    try {
      await createAnswerUseCase.execute({
        contestnumber: contest.contestnumber,
        fake,
        runanswer,
        yes,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error creating Answer" });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateAnswerUseCase = container.resolve(UpdateAnswerUseCase);

    const { id_answer } = request.params;

    const { contestnumber, fake, runanswer, yes } = request.body;
    console.log(parseInt(id_answer, 10));
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
      return response.status(400).json({ error: "Error updating Answer" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id_answer } = request.params;
    const idNumber = parseInt(id_answer, 10);
    const deleteAnswerUseCase = container.resolve(DeleteAnswerUseCase);

    try {
      await deleteAnswerUseCase.execute({ id: idNumber });
      return response
        .status(200)
        .json({ message: "Answer deleted successfully" });
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }
}

export { AnswerController };
