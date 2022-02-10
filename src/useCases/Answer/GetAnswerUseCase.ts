import { inject, injectable } from "tsyringe";

import { Answer } from "../../entities/Answer";
import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";

interface IRequest {
  id: number;
}

@injectable()
class GetAnswerUseCase {
  constructor(
    @inject("AnswersRepository")
    private answersRepository: AnswersRepository
  ) {}

  async execute({ id }: IRequest): Promise<Answer | undefined> {
    const answer = await this.answersRepository.getById(id);

    return answer;
  }
}

export { GetAnswerUseCase };
