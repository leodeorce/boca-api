import { inject, injectable } from "tsyringe";
import { ApiError } from "../../errors/ApiError";

import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

interface IRequest {
  id: number;
}

@injectable()
class DeleteContestsUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    if (Number.isNaN(id) || id < 1) {
      throw ApiError.badRequest("Invalid contest ID");
    }

    const existingContest = await this.contestsRepository.getById(id);

    if (!existingContest) {
      throw ApiError.notFound("Contest does not exist");
    }

    await this.contestsRepository.delete(id);
  }
}

export { DeleteContestsUseCase };
