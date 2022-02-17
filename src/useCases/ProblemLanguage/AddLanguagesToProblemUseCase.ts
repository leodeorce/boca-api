import { inject, injectable } from "tsyringe";

import { ProblemLanguageRepository } from "../../repositories/implementations/ProblemLanguageRepository";

interface IRequest {
  contestnumber: number;
  problemnumber: number;
  langnumbers: number[];
}

@injectable()
class AddLanguagesToProblemUseCase {
  constructor(
    @inject("ProblemLanguageRepository")
    private problemLanguageRepository: ProblemLanguageRepository
  ) {}

  async execute({
    contestnumber,
    problemnumber,
    langnumbers,
  }: IRequest): Promise<void> {
    try {
      await this.problemLanguageRepository.addLanguagesToProblem({
        contestnumber,
        problemnumber,
        langnumbers,
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { AddLanguagesToProblemUseCase };
