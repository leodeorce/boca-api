import { container, injectable } from "tsyringe";

import { Lang } from "../../entities/Lang";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import LangValidator from "../../shared/validation/entities/LangValidator";

interface IRequest {
  contestnumber: number;
  langnumber: number;
}

@injectable()
class GetLangUseCase {
  private contestValidator: ContestValidator;
  private langValidator: LangValidator;

  constructor() {
    this.contestValidator = container.resolve(ContestValidator);
    this.langValidator = container.resolve(LangValidator);
  }

  async execute({ contestnumber, langnumber }: IRequest): Promise<Lang> {
    await this.contestValidator.exists(contestnumber);
    return await this.langValidator.exists(contestnumber, langnumber);
  }
}

export { GetLangUseCase };
