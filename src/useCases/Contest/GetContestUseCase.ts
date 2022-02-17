import { inject, injectable } from "tsyringe";

import { Contest } from "../../entities/Contest";
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
    const contest = await this.contestsRepository.getById(id);

    return contest;
  }
}

export { GetContestsUseCase };
