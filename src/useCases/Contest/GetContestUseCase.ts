import { inject, injectable } from "tsyringe";

import { Contest } from "../../entities/Contest";
import { ApiError } from "../../errors/ApiError";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

interface IRequest {
  id: number;
}

@injectable()
class GetContestsUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Contest | undefined> {
    if (Number.isNaN(id) || id < 1) {
      throw ApiError.badRequest("Invalid contest ID");
    }

    const contest = await this.contestsRepository.getById(id);

    if (!contest) {
      throw ApiError.notFound("Contest does not exist");
    }

    return contest;
  }
}

export { GetContestsUseCase };
