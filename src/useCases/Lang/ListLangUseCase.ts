import { inject, injectable } from "tsyringe";

import { Lang } from "../../entities/Lang";
import { LangRepository } from "../../repositories/implementations/LangRepository";

@injectable()
class ListLangUseCase {
  constructor(
    @inject("LangRepository")
    private LangRepository: LangRepository
  ) {}

  async execute(problemNumber: number): Promise<Lang[]> {
    try {
      const Lang = await this.LangRepository.list(problemNumber);
      return Lang;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { ListLangUseCase };
