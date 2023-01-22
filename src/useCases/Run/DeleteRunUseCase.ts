import { container, inject, injectable } from "tsyringe";

import { IRunsRepository } from "../../repositories/IRunsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";
import RunValidator from "../../shared/validation/entities/RunValidator";

interface IRequest {
  contestnumber: number;
  runproblem: number;
  runnumber: number;
}

@injectable()
class DeleteRunUseCase {
  private contestValidator: ContestValidator;
  private problemValidator: ProblemValidator;
  private runValidator: RunValidator;

  constructor(
    @inject("RunsRepository")
    private runsRepository: IRunsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.problemValidator = container.resolve(ProblemValidator);
    this.runValidator = container.resolve(RunValidator);
  }

  async execute({
    contestnumber,
    runproblem,
    runnumber,
  }: IRequest): Promise<void> {
    await this.contestValidator.exists(contestnumber);
    await this.problemValidator.exists(contestnumber, runproblem);
    const existingRun = await this.runValidator.exists(
      contestnumber,
      runproblem,
      runnumber
    );

    if (existingRun.rundata !== undefined && existingRun.rundata != null) {
      await this.runsRepository.deleteBlob(existingRun.rundata);
    }

    await this.runsRepository.delete(contestnumber, runproblem, runnumber);
  }
}

export { DeleteRunUseCase };
