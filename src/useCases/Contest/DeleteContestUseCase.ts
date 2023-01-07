import { container, inject, injectable } from "tsyringe";

import { IContestsRepository } from "../../repositories/IContestsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
}

@injectable()
class DeleteContestsUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("ContestsRepository")
    private contestsRepository: IContestsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
  }

  async execute({ contestnumber }: IRequest): Promise<void> {
    await this.contestValidator.exists(contestnumber);
    await this.contestsRepository.delete(contestnumber);
  }
}

export { DeleteContestsUseCase };
