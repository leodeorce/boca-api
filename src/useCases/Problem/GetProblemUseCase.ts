import { inject, injectable } from "tsyringe";

import { Problem } from "../../entities/Problem";
import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";

interface IRequest {
  id: number;
}

@injectable()
class GetProblemUseCase {
  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: ProblemsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Problem | undefined> {
    const problem = await this.problemsRepository.getById(id);

    return problem;
  }
}

export { GetProblemUseCase };
