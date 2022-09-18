import { inject, injectable } from "tsyringe";

import { Lang } from "../../entities/Lang";
import { LangRepository } from "../../repositories/implementations/LangRepository";

interface IRequest {
  id: number;
}

@injectable()
class GetLangUseCase {
  constructor(
    @inject("LangRepository")
    private langRepository: LangRepository
  ) {}

  async execute({ id }: IRequest): Promise<Lang | undefined> {
    try {
      const lang = await this.langRepository.findById(id);
      return lang;
    } catch (error) {
      return Promise.reject(error)
    }

  }
}

export { GetLangUseCase };