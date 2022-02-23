import { inject, injectable } from "tsyringe";

import { LangRepository } from "../../repositories/implementations/LangRepository";

interface IRequest {
  langnumber: number;
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
    langnumber,
  }: IRequest): Promise<void> {
    const langAlreadyExists = await this.langRepository.findByName(langname, contestnumber);

    if (langAlreadyExists) {
      throw new Error("Language already exists");
    }

    try {
      await this.langRepository.update({
        contestnumber,
        langnumber,
        langname,
        langextension,
      });
    } catch (err) {
      Promise.reject(err);
    }
  }
}

export { UpdateLangUseCase };
