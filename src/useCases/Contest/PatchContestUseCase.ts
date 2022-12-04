import { container, inject, injectable } from "tsyringe";
import { Contest } from "../../entities/Contest";
import ContestValidator from "../../shared/validation/entities/ContestValidator";
import { IContestsRepository } from "../../repositories/IContestsRepository";

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
    const existingContest = await this.contestValidator.exists(contestnumber);

    // TODO Checar se novo nome não é uma string vazia

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

    await this.contestValidator.isValid(contest);

    /**    Abaixo acontecem duas queries que podem gerar inconsistências ao falhar.
     *     Se a desativação do contest ativo falhar, mas a ativação do novo ocorrer,
     *   existirão dois contests ativos.
     *     Se o contest ativo for desativado com sucesso, mas a ativação do novo contest falhar,
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

    return await this.contestsRepository.update({ ...contest });
  }
}

export { PatchContestUseCase };
