import { inject, injectable } from "tsyringe";

import { Contest } from "../../entities/Contest";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

@injectable()
class ListContestsUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {}

  async execute(): Promise<Contest[]> {
    const contests = await this.contestsRepository.list();

    return contests;
  }
}

export { ListContestsUseCase };
