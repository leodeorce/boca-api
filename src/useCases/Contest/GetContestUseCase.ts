import { container, injectable } from "tsyringe";

import { Contest } from "../../entities/Contest";

import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
}

@injectable()
class GetContestsUseCase {
  private contestValidator: ContestValidator;

  constructor() {
    this.contestValidator = container.resolve(ContestValidator);
  }

  async execute({ contestnumber }: IRequest): Promise<Contest | undefined> {
    return await this.contestValidator.exists(contestnumber);
  }
}

export { GetContestsUseCase };
