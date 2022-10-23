import { inject, injectable } from "tsyringe";

import { Run } from "../../entities/Run";
import { RunsRepository } from "../../repositories/implementations/RunsRepository";

@injectable()
class ListRunsUseCase {
  constructor(
    @inject("RunsRepository")
    private runsRepository: RunsRepository
  ) {}

  async execute(problemNumber: number): Promise<Run[]> {
    try {
      const runs = await this.runsRepository.list(problemNumber);
      return runs;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { ListRunsUseCase };
