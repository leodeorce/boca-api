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
    await this.answersRepository.create({
      contestnumber,
      fake,
      runanswer,
      yes,
    });
  }
}

export { CreateAnswerUseCase };
