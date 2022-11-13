import { container, inject, injectable } from "tsyringe";
import { Answer } from "../../entities/Answer";
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

// TODO Modificar para retornar erro caso nenhuma das propriedades forem passadas
@injectable()
class PatchAnswerUseCase {
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
    const existingAnswer = await this.answerValidator.exists(
      contestnumber,
      answernumber
    );

    const answer = new Answer();
    answer.contestnumber = contestnumber;
    answer.answernumber = answernumber;
    answer.fake = fake !== undefined ? fake : existingAnswer.fake;
    answer.runanswer =
      runanswer !== undefined ? runanswer : existingAnswer.runanswer;
    answer.yes = yes !== undefined ? yes : existingAnswer.yes;

    await this.answerValidator.isValid(answer);

    return await this.answersRepository.update({ ...answer });
  }
}

export { PatchAnswerUseCase };
