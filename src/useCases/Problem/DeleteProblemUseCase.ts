import { container, inject, injectable } from "tsyringe";

import { IProblemsRepository } from "../../repositories/IProblemsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";

interface IRequest {
  contestnumber: number;
  problemnumber: number;
}

@injectable()
class DeleteProblemUseCase {
  private contestValidator: ContestValidator;
  private problemValidator: ProblemValidator;

  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: IProblemsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.problemValidator = container.resolve(ProblemValidator);
  }

  async execute({ contestnumber, problemnumber }: IRequest): Promise<void> {
    await this.contestValidator.exists(contestnumber);

    const existingProblem = await this.problemValidator.exists(
      contestnumber,
      problemnumber
    );

    if (
      existingProblem.probleminputfile !== undefined &&
      existingProblem.probleminputfile != null
    ) {
      await this.problemsRepository.deleteBlob(
        existingProblem.probleminputfile
      );
    }

    await this.problemsRepository.delete(contestnumber, problemnumber);
  }
}

export { DeleteProblemUseCase };
