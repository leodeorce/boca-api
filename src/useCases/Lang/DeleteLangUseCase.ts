import { container, inject, injectable } from "tsyringe";

import { LangRepository } from "../../repositories/implementations/LangRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";
import LangValidator from "../../shared/validation/entities/LangValidator";

interface IRequest {
  contestnumber: number;
  langnumber: number;
}

@injectable()
class DeleteLangUseCase {
  private contestValidator: ContestValidator;
  private langValidator: LangValidator;

  constructor(
    @inject("LangRepository")
    private langRepository: LangRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.langValidator = container.resolve(LangValidator);
  }

  async execute({ contestnumber, langnumber }: IRequest): Promise<void> {
    await this.contestValidator.exists(contestnumber);
    await this.langValidator.exists(contestnumber, langnumber);
    await this.langRepository.delete(contestnumber, langnumber);
  }
}

export { DeleteLangUseCase };
