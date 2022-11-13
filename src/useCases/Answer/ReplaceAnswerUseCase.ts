import { container, inject, injectable } from "tsyringe";
import { Answer } from "../../entities/Answer";
import { ApiError } from "../../errors/ApiError";
import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";
import AnswerValidator from "../../shared/validation/entities/AnswerValidator";
import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
  answernumber: number;
  runanswer: string;
  yes: boolean;
  fake: boolean;
}

@injectable()
class ReplaceAnswerUseCase {
  private contestValidator: ContestValidator;
  private answerValidator: AnswerValidator;

  constructor(
    @inject("AnswersRepository")
    private answersRepository: AnswersRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.answerValidator = container.resolve(AnswerValidator);
  }

  async execute({
    answernumber,
    contestnumber,
    fake,
    runanswer,
    yes,
  }: IRequest): Promise<Answer> {
    await this.contestValidator.exists(contestnumber);
    await this.answerValidator.exists(contestnumber, answernumber);

    if (
      fake === undefined ||
      runanswer === undefined ||
      yes === undefined ||
      answernumber === undefined
    ) {
      throw ApiError.badRequest("Missing properties");
    }

    const answer = new Answer();
    answer.contestnumber = contestnumber;
    answer.answernumber = answernumber;
    answer.fake = fake;
    answer.runanswer = runanswer;
    answer.yes = yes;

    await this.answerValidator.isValid(answer);

    return await this.answersRepository.update({ ...answer });
  }
}

export { ReplaceAnswerUseCase };
