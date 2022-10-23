import { inject, injectable } from "tsyringe";

import { LangRepository } from "../../repositories/implementations/LangRepository";

interface IRequest {
  id: number;
}

@injectable()
class DeleteLangUseCase {
  constructor(
    @inject("LangRepository")
    private langRepository: LangRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const langAlreadyExists = await this.langRepository.findById(id);

    if (!langAlreadyExists) {
      throw new Error("Language does not exists");
    }

    try {
      await this.langRepository.delete(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { DeleteLangUseCase };
