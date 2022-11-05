import { container, inject, injectable } from "tsyringe";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";
import ContestValidator from "../../shared/validation/ContestValidator";
import SiteValidator from "../../shared/validation/SiteValidator";

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
    private sitesRepository: SitesRepository
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
