import { inject, injectable } from "tsyringe";

import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";

interface IRequest {
  id: number;
}

@injectable()
class DeleteAnswerUseCase {
  constructor(
    @inject("AnswersRepository")
    private answersRepository: AnswersRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const answerAlreadyExists = await this.answersRepository.getById(id);

    if (!answerAlreadyExists) {
      throw new Error("Answer does not exists");
    }

    try {
      await this.answersRepository.delete(id);
    } catch (error) {
      return Promise.reject(error)
    }

  }
}

export { DeleteAnswerUseCase };
