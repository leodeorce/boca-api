import "reflect-metadata";

import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { ContestRequestValidator } from "../../shared/validation/requests/ContestRequestValidator";
import { HttpStatus } from "../../shared/definitions/HttpStatusCodes";
import IdValidator from "../../shared/validation/utils/IdValidator";

import { CreateContestsUseCase } from "./CreateContestUseCase";
import { DeleteContestsUseCase } from "./DeleteContestUseCase";
import { GetContestsUseCase } from "./GetContestUseCase";
import { ListContestsUseCase } from "./ListContestsUseCase";
import { UpdateContestUseCase } from "./UpdateContestUseCase";

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
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    try {
      idValidator.isContestId(contestnumber);

      const contest = await getContestsUseCase.execute({
        contestnumber: contestnumber,
      });

      return response.status(HttpStatus.SUCCESS).json(contest);
    } catch (error) {
      next(error);
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const createContestsUseCase = container.resolve(CreateContestsUseCase);
    const contestRequestValidator = container.resolve(ContestRequestValidator);

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

    try {
      contestRequestValidator.hasRequiredCreateProperties(request.body);

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
    const updateContestUseCase = container.resolve(UpdateContestUseCase);
    const idValidator = container.resolve(IdValidator);
    const contestRequestValidator = container.resolve(ContestRequestValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

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
      idValidator.isContestId(contestnumber);
      contestRequestValidator.hasRequiredUpdateProperties(request.body);

      const updatedContest = await updateContestUseCase.execute({
        contestnumber,
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

      return response.status(HttpStatus.UPDATED).json(updatedContest);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const deleteContestsUseCase = container.resolve(DeleteContestsUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    try {
      idValidator.isContestId(contestnumber);

      await deleteContestsUseCase.execute({ contestnumber: contestnumber });

      return response.status(HttpStatus.DELETED).json();
    } catch (error) {
      next(error);
    }
  }
}

export { ContestController };
