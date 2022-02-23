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
    try {
      const contests = await this.contestsRepository.list();
      return contests;
      
    } catch (error) {
      return Promise.reject(error)
    }

  }
}

export { ListContestsUseCase };
