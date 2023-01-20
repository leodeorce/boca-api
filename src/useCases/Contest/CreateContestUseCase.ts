import { container, inject, injectable } from "tsyringe";

import { Contest } from "../../entities/Contest";

import { IContestsRepository } from "../../repositories/IContestsRepository";

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
  contestactive: boolean;
  contestmainsite: number;
  contestkeys: string;
  contestunlockkey: string;
  contestmainsiteurl: string;
}

@injectable()
class CreateContestsUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("ContestsRepository")
    private contestsRepository: IContestsRepository
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
    contestactive,
    contestmainsite,
    contestkeys,
    contestunlockkey,
    contestmainsiteurl,
  }: IRequest): Promise<Contest> {
    let lastId = await this.contestsRepository.getLastId();
    lastId = lastId !== undefined ? lastId : 0;
    const contestnumber = lastId + 1;

    const contest = new Contest(
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
      contestmainsiteurl
    );

    await this.contestValidator.isValid(contest);

    return await this.contestsRepository.create({ ...contest });
  }
}

export { CreateContestsUseCase };
