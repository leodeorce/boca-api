import { container, inject, injectable } from "tsyringe";

import { Lang } from "../../entities/Lang";

import { ILangRepository } from "../../repositories/ILangRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import LangValidator from "../../shared/validation/entities/LangValidator";

interface IRequest {
  contestnumber: number;
  langname: string;
  langextension: string;
}

@injectable()
class CreateLangUseCase {
  private contestValidator: ContestValidator;
  private langValidator: LangValidator;

  constructor(
    @inject("LangRepository")
    private langRepository: ILangRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.langValidator = container.resolve(LangValidator);
  }

  async execute({
    contestnumber,
    langname,
    langextension,
  }: IRequest): Promise<Lang> {
    await this.contestValidator.exists(contestnumber);

    let lastId = await this.langRepository.getLastId(contestnumber);
    lastId = lastId !== undefined ? lastId : 0;
    const langnumber = lastId + 1;

    const lang = new Lang(contestnumber, langnumber, langname, langextension);

    await this.langValidator.isValid(lang);

    return await this.langRepository.create({ ...lang });
  }
}

export { CreateLangUseCase };
