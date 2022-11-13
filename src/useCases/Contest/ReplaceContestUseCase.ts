import { container, inject, injectable } from "tsyringe";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { Contest } from "../../entities/Contest";
import { ApiError } from "../../errors/ApiError";
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
class ReplaceContestUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
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

    // TODO Checar se novo nome não é uma string vazia

    if (
      contestname === undefined ||
      conteststartdate === undefined ||
      contestduration === undefined ||
      contestlocalsite === undefined ||
      contestpenalty === undefined ||
      contestmaxfilesize === undefined ||
      contestactive === undefined ||
      contestmainsite === undefined ||
      contestkeys === undefined ||
      contestunlockkey === undefined ||
      contestmainsiteurl === undefined
    ) {
      throw ApiError.badRequest("Missing properties");
    }

    const contest = new Contest();
    contest.contestnumber = contestnumber;
    contest.contestname = contestname;
    contest.conteststartdate = conteststartdate;
    contest.contestduration = contestduration;
    contest.contestlastmileanswer = contestlastmileanswer
      ? contestlastmileanswer
      : contestduration;
    contest.contestlastmilescore = contestlastmilescore
      ? contestlastmilescore
      : contestduration;
    contest.contestlocalsite = contestlocalsite;
    contest.contestpenalty = contestpenalty;
    contest.contestmaxfilesize = contestmaxfilesize;
    contest.contestactive = contestactive;
    contest.contestmainsite = contestmainsite;
    contest.contestkeys = contestkeys;
    contest.contestunlockkey = contestunlockkey;
    contest.contestmainsiteurl = contestmainsiteurl;

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

export { ReplaceContestUseCase };
