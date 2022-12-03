import { inject, injectable } from "tsyringe";

import { Lang } from "../../../entities/Lang";
import { ApiError } from "../../../errors/ApiError";
import { ILangRepository } from "../../../repositories/ILangRepository";
import EntityValidator from "./EntityValidator";

@injectable()
class LangValidator extends EntityValidator<Lang> {
  constructor(
    @inject("LangRepository")
    private langRepository: ILangRepository
  ) {
    super();
  }

  async exists(contestnumber: number, langnumber: number): Promise<Lang> {
    const existingLang = await this.langRepository.getById(
      contestnumber,
      langnumber
    );

    if (!existingLang) {
      throw ApiError.notFound("Language does not exist");
    }

    return existingLang;
  }
}

export default LangValidator;
