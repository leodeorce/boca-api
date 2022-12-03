import { container, inject, injectable } from "tsyringe";

import { Lang } from "../../entities/Lang";
import { ApiError } from "../../errors/ApiError";
import { ILangRepository } from "../../repositories/ILangRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";
import LangValidator from "../../shared/validation/entities/LangValidator";

interface IRequest {
  contestnumber: number;
  langnumber: number;
  langname: string;
  langextension: string;
}

@injectable()
class ReplaceLangUseCase {
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
    langnumber,
    langname,
    langextension,
  }: IRequest): Promise<Lang> {
    await this.contestValidator.exists(contestnumber);
    await this.langValidator.exists(contestnumber, langnumber);

    if (langname === undefined || langextension === undefined) {
      throw ApiError.badRequest("Missing properties");
    }

    const lang = new Lang();
    lang.contestnumber = contestnumber;
    lang.langnumber = langnumber;
    lang.langname = langname;
    lang.langextension = langextension;

    await this.langValidator.isValid(lang);

    return await this.langRepository.update({ ...lang });
  }
}

export { ReplaceLangUseCase };
