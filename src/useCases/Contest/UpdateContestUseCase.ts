import { container, inject, injectable } from "tsyringe";

import { ApiError } from "../../errors/ApiError";

import { Contest } from "../../entities/Contest";

import { IContestsRepository } from "../../repositories/IContestsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
  contestname: string;
  conteststartdate: number;
  contestduration: number;
  contestlastmileanswer?: number;
  contestlastmilescore?: number;
  contestlocalsite: number;
  contestpenalty: number;
  contestmaxfilesize: number;
  contestactive: boolean;
  contestmainsite: number;
  contestkeys: string;
  contestunlockkey: string;
  contestmainsiteurl: string;
}

@injectable()
class UpdateContestUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("ContestsRepository")
    private contestsRepository: IContestsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
  }

  async execute({
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
  }: IRequest): Promise<Contest> {
    await this.contestValidator.exists(contestnumber);

    contestname = contestname ? contestname.trim() : "";
    if (contestname.length === 0) {
      throw ApiError.badRequest("Contest name must not be empty");
    }

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

    return await this.contestsRepository.update({ ...contest });
  }
}

export { UpdateContestUseCase };
