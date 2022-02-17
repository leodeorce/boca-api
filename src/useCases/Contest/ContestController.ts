import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { QueryFailedError } from "typeorm";

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
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error listing Contests" });
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
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error getting Contest" });
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
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error creating Contest" });
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
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error updating Contest" });
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
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error deleting contest" });
    }
  }
}

export { ContestController };
