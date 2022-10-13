import { Contest } from "../../entities/Contest";
import { ApiError } from "../../errors/ApiError";
import { inject, injectable } from "tsyringe";

import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

interface IRequest {
  contestname: string;
  conteststartdate: number;
  contestduration: number;
  contestlastmileanswer?: number;
  contestlastmilescore?: number;
  contestlocalsite: number;
  contestpenalty: number;
  contestmaxfilesize: number;
  contestmainsite: number;
  contestkeys?: string;
  contestunlockkey?: string;
  contestmainsiteurl?: string;
}

@injectable()
class CreateContestsUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<Contest> {
    contestname = contestname ? contestname.trim() : "";
    if (contestname.length === 0) {
      throw ApiError.badRequest("Contest name must be specified");
    }

    const contestAlreadyExists = await this.contestsRepository.findByName(
      contestname
    );

    if (contestAlreadyExists) {
      throw ApiError.alreadyExists("Contest name already exists");
    }

    if (
      !conteststartdate ||
      !contestduration ||
      !contestlocalsite ||
      !contestmainsite ||
      !contestpenalty ||
      !contestmaxfilesize
    ) {
      throw ApiError.badRequest("Missing properties");
    }

    if (contestduration <= 0) {
      throw ApiError.badRequest("Duration must be a non-zero positive integer");
    }

    if (contestlocalsite <= 0) {
      throw ApiError.badRequest(
        "Local site ID must be a non-zero positive integer"
      );
    }

    if (contestmainsite <= 0) {
      throw ApiError.badRequest(
        "Main site ID must be a non-zero positive integer"
      );
    }

    if (contestlastmileanswer) {
      if (contestlastmileanswer < 0) {
        throw ApiError.badRequest(
          "If specified, last mile for answers must be at least zero seconds"
        );
      }
      if (contestlastmileanswer > contestduration) {
        throw ApiError.badRequest(
          "If specified, last mile for answers cannot be greater than contest duration"
        );
      }
    }

    if (contestlastmilescore) {
      if (contestlastmilescore < 0) {
        throw ApiError.badRequest(
          "If specified, last mile for scores must be at least zero seconds"
        );
      }
      if (contestlastmilescore > contestduration) {
        throw ApiError.badRequest(
          "If specified, last mile for scores cannot be greater than contest duration"
        );
      }
    }

    contestlastmileanswer = contestlastmileanswer
      ? contestlastmileanswer
      : contestduration;
    contestlastmilescore = contestlastmilescore
      ? contestlastmilescore
      : contestduration;
    contestkeys = contestkeys ? contestkeys : "";
    contestmainsiteurl = contestmainsiteurl ? contestmainsiteurl : "";
    contestunlockkey = contestunlockkey ? contestunlockkey : "";

    const contestactive = false;

    let lastId = await this.contestsRepository.getLastId();
    lastId = lastId ? lastId : 0;
    const contestnumber = lastId + 1;

    return await this.contestsRepository.create({
      contestnumber,
      contestname,
      conteststartdate,
      contestduration,
      contestlastmileanswer,
      contestlastmilescore,
      contestlocalsite,
      contestpenalty,
      contestmaxfilesize,
      contestactive,
      contestmainsite,
      contestkeys,
      contestunlockkey,
      contestmainsiteurl,
    });
  }
}

export { CreateContestsUseCase };
