import { inject, injectable } from "tsyringe";

import { Working } from "../../entities/Working";
import { WorkingsRepository } from "../../repositories/implementations/WorkingsRepository";

@injectable()
class ListWorkingsUseCase {
  constructor(
    @inject("WorkingsRepository")
    private workingsRepository: WorkingsRepository
  ) {}

  async execute(contestNumber: number): Promise<Working[]> {
    try {
      const workings = await this.workingsRepository.list(contestNumber);
      return workings;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { ListWorkingsUseCase };
