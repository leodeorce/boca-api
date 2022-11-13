import { Contest } from "../../entities/Contest";
import { ApiError } from "../../errors/ApiError";
import { container, inject, injectable } from "tsyringe";

import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";

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
  contestkeys?: string; // TODO Avaliar obrigatoriedade
  contestunlockkey?: string;
  contestmainsiteurl?: string;
}

@injectable()
class CreateContestsUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
  }

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

    const existingContest = await this.contestsRepository.findByName(
      contestname
    );

    if (existingContest) {
      throw ApiError.alreadyExists("Contest name already exists");
    }

    if (
      conteststartdate === undefined ||
      contestduration === undefined ||
      contestlocalsite === undefined ||
      contestmainsite === undefined ||
      contestpenalty === undefined ||
      contestmaxfilesize === undefined
    ) {
      throw ApiError.badRequest("Missing properties");
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

    const contest = new Contest();
    contest.contestnumber = contestnumber;
    contest.contestname = contestname;
    contest.conteststartdate = conteststartdate;
    contest.contestduration = contestduration;
    contest.contestlastmileanswer = contestlastmileanswer;
    contest.contestlastmilescore = contestlastmilescore;
    contest.contestlocalsite = contestlocalsite;
    contest.contestpenalty = contestpenalty;
    contest.contestmaxfilesize = contestmaxfilesize;
    contest.contestactive = contestactive;
    contest.contestmainsite = contestmainsite;
    contest.contestkeys = contestkeys;
    contest.contestunlockkey = contestunlockkey;
    contest.contestmainsiteurl = contestmainsiteurl;

    await this.contestValidator.isValid(contest);

    return await this.contestsRepository.create({ ...contest });
  }
}

export { CreateContestsUseCase };
