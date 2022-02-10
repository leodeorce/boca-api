import { inject, injectable } from "tsyringe";

import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";

interface IRequest {
  contestnumber: number;
  answernumber: number;
  runanswer?: string;
  yes?: boolean;
  fake?: boolean;
}

@injectable()
class UpdateAnswerUseCase {
  constructor(
    @inject("AnswersRepository")
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answernumber,
    contestnumber,
    fake,
    runanswer,
    yes,
  }: IRequest): Promise<void> {
    const answerExists = await this.answersRepository.getById(answernumber);

    if (!answerExists) {
      throw new Error("Answer does not exist");
    }
    try {
      await this.answersRepository.update({
        answernumber,
        contestnumber,
        fake,
        runanswer,
        yes,
      });
      return Promise.resolve();
    } catch (err) {
      const error = err as Error;
      return Promise.reject(error);
    }
  }
}

export { UpdateAnswerUseCase };
