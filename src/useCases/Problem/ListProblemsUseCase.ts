import { container, inject, injectable } from "tsyringe";

import { Problem } from "../../entities/Problem";
import { IProblemsRepository } from "../../repositories/IProblemsRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
}

@injectable()
class ListProblemsUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: IProblemsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
  }

  async execute({ contestnumber }: IRequest): Promise<Problem[]> {
    await this.contestValidator.exists(contestnumber);
    return await this.problemsRepository.list(contestnumber);
  }
}

export { ListProblemsUseCase };
