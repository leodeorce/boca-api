import { container, inject, injectable } from "tsyringe";
import { Answer } from "../../entities/Answer";
import { ApiError } from "../../errors/ApiError";

import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";
import AnswerValidator from "../../shared/validation/entities/AnswerValidator";
import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
  answernumber?: number;
  runanswer: string;
  yes: boolean;
  fake: boolean;
}

@injectable()
class CreateAnswerUseCase {
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
    contestnumber,
    answernumber,
    fake,
    runanswer,
    yes,
  }: IRequest): Promise<Answer> {
    await this.contestValidator.exists(contestnumber);

    if (fake === undefined || runanswer === undefined || yes === undefined) {
      throw ApiError.badRequest("Missing properties");
    }

    // answernumber é opcional. Caso não especificado, será o próximo ID disponível.
    // Caso especificado, devemos verificar se já não existe.
    if (answernumber === undefined) {
      let lastId = await this.answersRepository.getLastId(contestnumber);
      lastId = lastId ? lastId : 0;
      answernumber = lastId + 1;
    } else {
      const existingAnswer = await this.answersRepository.getById(
        contestnumber,
        answernumber
      );

      if (existingAnswer !== undefined) {
        throw ApiError.alreadyExists("Answer already exists for this contest");
      }
    }

    const answer = new Answer();
    answer.contestnumber = contestnumber;
    answer.answernumber = answernumber;
    answer.fake = fake;
    answer.runanswer = runanswer;
    answer.yes = yes;
    
    await this.answerValidator.isValid(answer);

    return await this.answersRepository.create({
      contestnumber,
      answernumber,
      fake,
      runanswer,
      yes,
    });
  }
}

export { CreateAnswerUseCase };
