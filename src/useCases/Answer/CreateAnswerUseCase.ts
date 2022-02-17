import { inject, injectable } from "tsyringe";

import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";

interface IRequest {
  contestnumber: number;
  runanswer: string;
  yes: boolean;
  fake: boolean;
}

@injectable()
class CreateAnswerUseCase {
  constructor(
    @inject("AnswersRepository")
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    contestnumber,
    fake,
    runanswer,
    yes,
  }: IRequest): Promise<void> {
    const count = (await this.answersRepository.count()) + 1;

    await this.answersRepository.create({
      contestnumber,
      answernumber: count,
      fake,
      runanswer,
      yes,
    });
  }
}

export { CreateAnswerUseCase };
