import { container, inject, injectable } from "tsyringe";

import { Site } from "../../entities/Site";

import { ISitesRepository } from "../../repositories/ISitesRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";

interface IRequest {
  contestnumber: number;
}

@injectable()
class ListSitesUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("SitesRepository")
    private sitesRepository: ISitesRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
  }

  async execute({ contestnumber }: IRequest): Promise<Site[]> {
    await this.contestValidator.exists(contestnumber);
    return await this.sitesRepository.list(contestnumber);
  }
}

export { ListSitesUseCase };
