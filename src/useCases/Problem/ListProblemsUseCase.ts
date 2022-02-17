import { inject, injectable } from "tsyringe";

import { Problem } from "../../entities/Problem";
import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";

@injectable()
class ListProblemsUseCase {
  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: ProblemsRepository
  ) {}

  async execute(contestnumber: number): Promise<Problem[]> {
    const problems = await this.problemsRepository.list(contestnumber);

    return problems;
  }
}

export { ListProblemsUseCase };
