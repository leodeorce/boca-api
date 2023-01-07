import { container, injectable } from "tsyringe";

import { Site } from "../../entities/Site";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import SiteValidator from "../../shared/validation/entities/SiteValidator";

interface IRequest {
  sitenumber: number;
  contestnumber: number;
}

@injectable()
class GetSiteUseCase {
  private contestValidator: ContestValidator;
  private siteValidator: SiteValidator;

  constructor() {
    this.contestValidator = container.resolve(ContestValidator);
    this.siteValidator = container.resolve(SiteValidator);
  }

  async execute({
    sitenumber,
    contestnumber,
  }: IRequest): Promise<Site | undefined> {
    await this.contestValidator.exists(contestnumber);
    return await this.siteValidator.exists(contestnumber, sitenumber);
  }
}

export { GetSiteUseCase };
