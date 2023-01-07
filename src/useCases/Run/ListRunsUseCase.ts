import { container, inject, injectable } from "tsyringe";

import { Run } from "../../entities/Run";

import { IRunsRepository } from "../../repositories/IRunsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";

interface IRequest {
  contestnumber: number;
  runproblem: number;
}

@injectable()
class ListRunsUseCase {
  private contestValidator: ContestValidator;
  private problemValidator: ProblemValidator;

  constructor(
    @inject("RunsRepository")
    private runsRepository: IRunsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.problemValidator = container.resolve(ProblemValidator);
  }

  async execute({ contestnumber, runproblem }: IRequest): Promise<Run[]> {
    await this.contestValidator.exists(contestnumber);
    await this.problemValidator.exists(contestnumber, runproblem);
    return await this.runsRepository.list(contestnumber, runproblem);
  }
}

export { ListRunsUseCase };
