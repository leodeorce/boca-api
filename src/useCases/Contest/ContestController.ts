import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import { CreateContestsUseCase } from "./CreateContestUseCase";
import { DeleteContestsUseCase } from "./DeleteContestUseCase";
import { GetContestsUseCase } from "./GetContestUseCase";
import { ListContestsUseCase } from "./ListContestsUseCase";
import { UpdateContestsUseCase } from "./UpdateContestUseCase";

class ContestController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const listContestsUseCase = container.resolve(ListContestsUseCase);

    try {
      const all = await listContestsUseCase.execute();
      return response.json(all);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const getContestsUseCase = container.resolve(GetContestsUseCase);
    const { id } = request.params;
    const numberId = Number(id);

    try {
      const contest = await getContestsUseCase.execute({ id: numberId });
      return response.json(contest);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createContestsUseCase = container.resolve(CreateContestsUseCase);
    const {
      contestname,
      contestactive,
      contestduration,
      contestkeys,
      contestlastmileanswer,
      contestlastmilescore,
      contestlocalsite,
      contestmainsite,
      contestmainsiteurl,
      contestmaxfilesize,
      contestpenalty,
      conteststartdate,
      contestunlockkey,
    } = request.body;

    try {
      await createContestsUseCase.execute({
        contestname,
        contestactive,
        contestduration,
        contestkeys,
        contestlastmileanswer,
        contestlastmilescore,
        contestlocalsite,
        contestmainsite,
        contestmainsiteurl,
        contestmaxfilesize,
        contestpenalty,
        conteststartdate,
        contestunlockkey,
      });

      return response.status(201).send();
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateContestsUseCase = container.resolve(UpdateContestsUseCase);
    const { id } = request.params;
    const idNumber = parseInt(id, 10);
    const {
      contestname,
      contestactive,
      contestduration,
      contestkeys,
      contestlastmileanswer,
      contestlastmilescore,
      contestlocalsite,
      contestmainsite,
      contestmainsiteurl,
      contestmaxfilesize,
      contestpenalty,
      conteststartdate,
      contestunlockkey,
    } = request.body;

    try {
      const updatedContest = await updateContestsUseCase.execute({
        contestnumber: idNumber,
        contestname,
        contestactive,
        contestduration,
        contestkeys,
        contestlastmileanswer,
        contestlastmilescore,
        contestlocalsite,
        contestmainsite,
        contestmainsiteurl,
        contestmaxfilesize,
        contestpenalty,
        conteststartdate,
        contestunlockkey,
      });

      return response.status(200).json(updatedContest);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const idNumber = parseInt(id, 10);
    const deleteContestsUseCase = container.resolve(DeleteContestsUseCase);

    try {
      await deleteContestsUseCase.execute({ id: idNumber });
      return response
        .status(200)
        .json({ message: "Contest deleted successfully" });
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ContestController };
