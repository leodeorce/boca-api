import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateContestsUseCase } from "./CreateContestUseCase";
import { DeleteContestsUseCase } from "./DeleteContestUseCase";
import { GetContestsUseCase } from "./GetContestUseCase";
import { ListContestsUseCase } from "./ListContestsUseCase";
import { PatchContestUseCase } from "./PatchContestUseCase";
import { ReplaceContestUseCase } from "./ReplaceContestUseCase";

class ContestController {
  async listAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const listContestsUseCase = container.resolve(ListContestsUseCase);

    try {
      const all = await listContestsUseCase.execute();
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
    const getContestsUseCase = container.resolve(GetContestsUseCase);
    const { id } = request.params;
    const numberId = Number(id);

    try {
      const contest = await getContestsUseCase.execute({ id: numberId });
      return response.json(contest);
    } catch (error) {
      next(error);
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const createContestsUseCase = container.resolve(CreateContestsUseCase);

      const {
        contestname,
        conteststartdate,
        contestduration,
        contestlastmileanswer,
        contestlastmilescore,
        contestlocalsite,
        contestpenalty,
        contestmaxfilesize,
        contestmainsite,
        contestkeys,
        contestunlockkey,
        contestmainsiteurl,
      } = request.body;

      const contest = await createContestsUseCase.execute({
        contestname,
        conteststartdate,
        contestduration,
        contestlastmileanswer,
        contestlastmilescore,
        contestlocalsite,
        contestpenalty,
        contestmaxfilesize,
        contestmainsite,
        contestkeys,
        contestunlockkey,
        contestmainsiteurl,
      });

      return response.status(200).json(contest);
    } catch (error) {
      next(error);
    }
  }

  async updatePartial(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const patchContestUseCase = container.resolve(PatchContestUseCase);
    const { id } = request.params;
    const idNumber = Number(id);
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
      const updatedContest = await patchContestUseCase.execute({
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
      next(error);
    }
  }

  async updateFull(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const replaceContestUseCase = container.resolve(ReplaceContestUseCase);
    const { id } = request.params;
    const idNumber = Number(id);
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
      const updatedContest = await replaceContestUseCase.execute({
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
      next(error);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const { id } = request.params;
    const idNumber = Number(id);
    const deleteContestsUseCase = container.resolve(DeleteContestsUseCase);

    try {
      await deleteContestsUseCase.execute({ id: idNumber });
      return response.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export { ContestController };
