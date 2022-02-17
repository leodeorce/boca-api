import { inject, injectable } from "tsyringe";

import { ProblemLanguageRepository } from "../../repositories/implementations/ProblemLanguageRepository";

interface IRequest {
  contestnumber: number;
  langnumbers: number[];
  problemnumber: number;
}

@injectable()
class DeleteLanguagesFromProblemUseCase {
  constructor(
    @inject("ProblemLanguageRepository")
    private problemLanguageRepository: ProblemLanguageRepository
  ) {}

  async execute({
    contestnumber,
    langnumbers,
    problemnumber,
  }: IRequest): Promise<void> {
    try {
      await this.problemLanguageRepository.deleteLanguagesFromProblem({
        contestnumber,
        langnumbers,
        problemnumber,
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { DeleteLanguagesFromProblemUseCase };
