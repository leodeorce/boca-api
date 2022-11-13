import { container, injectable } from "tsyringe";
import { Answer } from "../../entities/Answer";
import AnswerValidator from "../../shared/validation/entities/AnswerValidator";
import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
  answernumber: number;
}

@injectable()
class GetAnswerUseCase {
  private contestValidator: ContestValidator;
  private answerValidator: AnswerValidator;

  constructor() {
    this.contestValidator = container.resolve(ContestValidator);
    this.answerValidator = container.resolve(AnswerValidator);
  }

  async execute({ contestnumber, answernumber }: IRequest): Promise<Answer> {
    await this.contestValidator.exists(contestnumber);
    return await this.answerValidator.exists(contestnumber, answernumber);
  }
}

export { GetAnswerUseCase };
