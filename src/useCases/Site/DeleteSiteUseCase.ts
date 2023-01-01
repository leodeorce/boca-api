import { container, inject, injectable } from "tsyringe";

import { ISitesRepository } from "../../repositories/ISitesRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import SiteValidator from "../../shared/validation/entities/SiteValidator";

interface IRequest {
  sitenumber: number;
  contestnumber: number;
}

@injectable()
class DeleteSiteUseCase {
  private contestValidator: ContestValidator;
  private siteValidator: SiteValidator;

  constructor(
    @inject("SitesRepository")
    private sitesRepository: ISitesRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.siteValidator = container.resolve(SiteValidator);
  }

  async execute({ sitenumber, contestnumber }: IRequest): Promise<void> {
    await this.contestValidator.exists(contestnumber);
    await this.siteValidator.exists(contestnumber, sitenumber);
    await this.sitesRepository.delete(sitenumber, contestnumber);
  }
}

export { DeleteSiteUseCase };
