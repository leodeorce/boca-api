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
  contestactive: boolean;
  contestmainsite: number;
  contestkeys: string;
  contestunlockkey: string;
  contestmainsiteurl: string;
}

@injectable()
class CreateContestsUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<void> {
    const contestAlreadyExists = await this.contestsRepository.findByName(
      contestname
    );

    if (contestAlreadyExists) {
      throw new Error("Contest already exists");
    }

    const count = (await this.contestsRepository.count()) + 1;

    this.contestsRepository.create({
      contestnumber: count,
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
  }
}

export { CreateContestsUseCase };
