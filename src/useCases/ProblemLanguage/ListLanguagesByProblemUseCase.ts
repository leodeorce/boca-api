import { inject, injectable } from "tsyringe";

import { Lang } from "../../entities/Lang";
import { ProblemLanguageRepository } from "../../repositories/implementations/ProblemLanguageRepository";

@injectable()
class ListLanguagesByProblemUseCase {
  constructor(
    @inject("ProblemLanguageRepository")
    private problemLanguageRepository: ProblemLanguageRepository
  ) {}

  async execute(problemNumber: number): Promise<Lang[]> {
    try {
      const languages =
        await this.problemLanguageRepository.getLanguagesByProblem(
          problemNumber
        );

      if (languages === undefined) {
        return [];
      }

      return languages;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { ListLanguagesByProblemUseCase };
