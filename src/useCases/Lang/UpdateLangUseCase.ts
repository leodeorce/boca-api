import { inject, injectable } from "tsyringe";

import { LangRepository } from "../../repositories/implementations/LangRepository";

interface IRequest {
  contestnumber: number;
  langname: string;
  langextension: string;
}

@injectable()
class UpdateLangUseCase {
  constructor(
    @inject("LangRepository")
    private langRepository: LangRepository
  ) {}

  async execute({
    contestnumber,
    langname,
    langextension,
  }: IRequest): Promise<void> {
    const langAlreadyExists = await this.langRepository.findByName(langname);

    if (langAlreadyExists) {
      throw new Error("Language already exists");
    }

    try {
      const count = (await this.langRepository.count()) + 1;

      await this.langRepository.create({
        contestnumber,
        langnumber: count,
        langname,
        langextension,
      });
    } catch (err) {
      Promise.reject(err);
    }
  }
}

export { UpdateLangUseCase };
