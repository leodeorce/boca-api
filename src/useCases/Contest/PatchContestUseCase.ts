import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { Contest } from "../../entities/Contest";
import { ApiError } from "../../errors/ApiError";

interface IRequest {
  contestnumber: number;
  contestname?: string;
  conteststartdate?: number;
  contestduration?: number;
  contestlastmileanswer?: number;
  contestlastmilescore?: number;
  contestlocalsite?: number;
  contestpenalty?: number;
  contestmaxfilesize?: number;
  contestactive?: boolean;
  contestmainsite?: number;
  contestkeys?: string;
  contestunlockkey?: string;
  contestmainsiteurl?: string;
}

@injectable()
class PatchContestUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {}

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
    if (Number.isNaN(contestnumber) || contestnumber < 1) {
      throw ApiError.badRequest("Invalid contest ID");
    }

    const existingContest = await this.contestsRepository.getById(
      contestnumber
    );

    if (!existingContest) {
      throw ApiError.notFound("Contest does not exist");
    }

    const contest = new Contest();
    contest.contestnumber = contestnumber;
    contest.contestname = contestname
      ? contestname
      : existingContest.contestname;
    contest.conteststartdate = conteststartdate
      ? conteststartdate
      : existingContest.conteststartdate;
    contest.contestduration = contestduration
      ? contestduration
      : existingContest.contestduration;
    contest.contestlastmileanswer = contestlastmileanswer
      ? contestlastmileanswer
      : existingContest.contestlastmileanswer;
    contest.contestlastmilescore = contestlastmilescore
      ? contestlastmilescore
      : existingContest.contestlastmilescore;
    contest.contestlocalsite = contestlocalsite
      ? contestlocalsite
      : existingContest.contestlocalsite;
    contest.contestpenalty = contestpenalty
      ? contestpenalty
      : existingContest.contestpenalty;
    contest.contestmaxfilesize = contestmaxfilesize
      ? contestmaxfilesize
      : existingContest.contestmaxfilesize;
    contest.contestactive = contestactive
      ? contestactive
      : existingContest.contestactive;
    contest.contestmainsite = contestmainsite
      ? contestmainsite
      : existingContest.contestmainsite;
    contest.contestkeys = contestkeys
      ? contestkeys
      : existingContest.contestkeys;
    contest.contestunlockkey = contestunlockkey
      ? contestunlockkey
      : existingContest.contestunlockkey;
    contest.contestmainsiteurl = contestmainsiteurl
      ? contestmainsiteurl
      : existingContest.contestmainsiteurl;

    const validation = await validate(contest);

    if (validation.length > 0) {
      const errors = validation[0].constraints as Record<string, string>;
      const [, message] = Object.entries(errors)[0];
      throw ApiError.badRequest(message);
    }

    /* Abaixo acontecem duas queries que podem gerar inconsistências ao falhar.
     * Se a desativação do contest ativo falhar, mas a ativação do novo ocorrer,
     *   existirão dois contests ativos.
     * Se o contest ativo for desativado com sucesso, mas a ativação do novo contest falhar,
     *   a desativação do primeiro foi em vão.
     */

    if (contestactive) {
      const activeContest = await this.contestsRepository.getActive();

      if (activeContest && activeContest.contestnumber !== contestnumber) {
        await this.contestsRepository.update({
          contestnumber: activeContest.contestnumber,
          contestactive: false,
        });
      }
    }

    return await this.contestsRepository.update({
      contestnumber: contest.contestnumber,
      contestname: contest.contestname,
      contestactive: contest.contestactive,
      contestduration: contest.contestduration,
      contestkeys: contest.contestkeys,
      contestlastmileanswer: contest.contestlastmileanswer,
      contestlastmilescore: contest.contestlastmilescore,
      contestlocalsite: contest.contestlocalsite,
      contestmainsite: contest.contestmainsite,
      contestmainsiteurl: contest.contestmainsiteurl,
      contestmaxfilesize: contest.contestmaxfilesize,
      contestpenalty: contest.contestpenalty,
      conteststartdate: contest.conteststartdate,
      contestunlockkey: contest.contestunlockkey,
    });
  }
}

export { PatchContestUseCase };
