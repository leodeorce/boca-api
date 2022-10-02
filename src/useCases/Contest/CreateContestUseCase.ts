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
    contestname = contestname.trim();
    if (contestname.length === 0) {
      throw ApiError.badRequest("Contest name must be specified");
    }

    const contestAlreadyExists = await this.contestsRepository.findByName(
      contestname
    );

    if (contestAlreadyExists) {
      throw ApiError.alreadyExists("Contest name already exists");
    }

    const currentDate = Math.floor(Date.now() / 1000);
    if (currentDate > conteststartdate + 600) {
      throw ApiError.badRequest(
        "Start date is invalid. Verify epoch \
          time is in UTC +0 and is at most 10 minutes ago."
      );
    }

    if (contestduration < 3600) {
      throw ApiError.badRequest("Duration must be at least 1 hour");
    }

    if (contestlocalsite < 1) {
      throw ApiError.badRequest(
        "Local site ID must be non-zero positive integer"
      );
    }

    if (contestmainsite < 1) {
      throw ApiError.badRequest(
        "Main site ID must be non-zero positive integer"
      );
    }

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
