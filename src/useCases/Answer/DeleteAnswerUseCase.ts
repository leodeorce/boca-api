import { container, inject, injectable } from "tsyringe";

import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";
import AnswerValidator from "../../shared/validation/entities/AnswerValidator";
import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
  answernumber: number;
}

@injectable()
class DeleteAnswerUseCase {
  private contestValidator: ContestValidator;
  private answerValidator: AnswerValidator;

  constructor(
    @inject("AnswersRepository")
    private answersRepository: AnswersRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.answerValidator = container.resolve(AnswerValidator);
  }

  async execute({ contestnumber, answernumber }: IRequest): Promise<void> {
    await this.contestValidator.exists(contestnumber);
    await this.answerValidator.exists(contestnumber, answernumber);
    await this.answersRepository.delete(contestnumber, answernumber);
  }
}

export { DeleteAnswerUseCase };
