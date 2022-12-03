import { inject, injectable } from "tsyringe";

import { Contest } from "../../entities/Contest";
import { IContestsRepository } from "../../repositories/IContestsRepository";

@injectable()
class ListContestsUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: IContestsRepository
  ) {}

  async execute(): Promise<Contest[]> {
    return await this.contestsRepository.list();
  }
}

export { ListContestsUseCase };
