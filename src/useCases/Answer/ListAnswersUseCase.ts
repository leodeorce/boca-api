import { container, inject, injectable } from "tsyringe";

import { Answer } from "../../entities/Answer";

import { IAnswersRepository } from "../../repositories/IAnswersRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
}

@injectable()
class ListAnswersUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("AnswersRepository")
    private answersRepository: IAnswersRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
  }

  async execute({ contestnumber }: IRequest): Promise<Answer[]> {
    await this.contestValidator.exists(contestnumber);
    return await this.answersRepository.list(contestnumber);
  }
}

export { ListAnswersUseCase };
