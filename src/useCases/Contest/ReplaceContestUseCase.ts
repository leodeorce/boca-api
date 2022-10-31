import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { Contest } from "../../entities/Contest";
import { ApiError } from "../../errors/ApiError";

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
    const existingContest = await this.contestsRepository.getById(
      contestnumber
    );
    if (!existingContest) {
      throw ApiError.notFound("Contest does not exist");
    }

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

    if (contestactive) {
      const activeContest = await this.contestsRepository.getActive();

      if (activeContest) {
        if (activeContest.contestnumber !== contestnumber) {
          throw ApiError.alreadyExists("Another contest is already active");
        }
      }
    }

    // TODO Checar se novo nome não é uma string vazia

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

export { ReplaceContestUseCase };
