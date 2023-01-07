import { container, injectable } from "tsyringe";

import { Problem } from "../../entities/Problem";
import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";

interface IRequest {
  contestnumber: number;
  problemnumber: number;
}

@injectable()
class GetProblemUseCase {
  private contestValidator: ContestValidator;
  private problemValidator: ProblemValidator;

  constructor() {
    this.contestValidator = container.resolve(ContestValidator);
    this.problemValidator = container.resolve(ProblemValidator);
  }

  async execute({ contestnumber, problemnumber }: IRequest): Promise<Problem> {
    await this.contestValidator.exists(contestnumber);
    return await this.problemValidator.exists(contestnumber, problemnumber);
  }
}

export { GetProblemUseCase };
