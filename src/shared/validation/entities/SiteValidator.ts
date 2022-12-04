import { inject, injectable } from "tsyringe";

import { Site } from "../../../entities/Site";
import { ApiError } from "../../../errors/ApiError";
import { ISitesRepository } from "../../../repositories/ISitesRepository";
import EntityValidator from "./EntityValidator";

@injectable()
class SiteValidator extends EntityValidator<Site> {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: ISitesRepository
  ) {
    super();
  }

  async exists(contestnumber: number, sitenumber: number): Promise<Site> {
    const existingSite = await this.sitesRepository.getById(
      contestnumber,
      sitenumber
    );

    if (!existingSite) {
      throw ApiError.notFound("Site does not exist");
    }

    return existingSite;
  }
}

export default SiteValidator;
