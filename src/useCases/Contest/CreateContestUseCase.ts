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
  contestpenalty: number;
  contestmaxfilesize: number;
  contestactive: boolean;
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
    contestpenalty,
    contestmaxfilesize,
    contestactive,
    contestkeys,
    contestunlockkey,
    contestmainsiteurl,
  }: IRequest): Promise<void> {
    contestname = contestname.trim();
    contestname = contestname ? contestname : "Contest";

    const contestAlreadyExists = await this.contestsRepository.findByName(
      contestname
    );

    if (contestAlreadyExists) {
      throw ApiError.alreadyExists("Contest name already exists");
    }

    contestkeys = contestkeys ? contestkeys : "";
    contestmainsiteurl = contestmainsiteurl ? contestmainsiteurl : "";
    contestunlockkey = contestunlockkey ? contestunlockkey : "";
    
    const contestlocalsite = 1;
    const contestmainsite = 1;
    
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
