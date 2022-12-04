import { container, inject, injectable } from "tsyringe";

import { Lang } from "../../entities/Lang";
import { ILangRepository } from "../../repositories/ILangRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
}

@injectable()
class ListLangUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("LangRepository")
    private langRepository: ILangRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
  }

  async execute({ contestnumber }: IRequest): Promise<Lang[]> {
    await this.contestValidator.exists(contestnumber);
    return await this.langRepository.list(contestnumber);
  }
}

export { ListLangUseCase };
