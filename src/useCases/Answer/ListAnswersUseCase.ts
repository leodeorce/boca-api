import { inject, injectable } from "tsyringe";

import { Answer } from "../../entities/Answer";
import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";

@injectable()
class ListAnswersUseCase {
  constructor(
    @inject("AnswersRepository")
    private answersRepository: AnswersRepository
  ) {}

  async execute(contestNumber: number): Promise<Answer[]> {
    try {
      const answers = await this.answersRepository.list(contestNumber);
      return answers;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { ListAnswersUseCase };
