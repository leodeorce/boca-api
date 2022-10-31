import { inject, injectable } from "tsyringe";

import { Contest } from "../../entities/Contest";
import { ApiError } from "../../errors/ApiError";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

interface IRequest {
  contestnumber: number;
}

@injectable()
class GetContestsUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {}

  async execute({ contestnumber }: IRequest): Promise<Contest | undefined> {
    const contest = await this.contestsRepository.getById(contestnumber);
    if (!contest) {
      throw ApiError.notFound("Contest does not exist");
    }

    return contest;
  }
}

export { GetContestsUseCase };
