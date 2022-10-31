import { inject, injectable } from "tsyringe";
import { ApiError } from "../../errors/ApiError";

import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

interface IRequest {
  contestnumber: number;
}

@injectable()
class DeleteContestsUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {}

  async execute({ contestnumber }: IRequest): Promise<void> {
    const existingContest = await this.contestsRepository.getById(contestnumber);
    if (!existingContest) {
      throw ApiError.notFound("Contest does not exist");
    }

    await this.contestsRepository.delete(contestnumber);
  }
}

export { DeleteContestsUseCase };
