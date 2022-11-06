import { inject, injectable } from "tsyringe";
import { Site } from "../../entities/Site";
import { ApiError } from "../../errors/ApiError";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";
import Validator from "./Validator";

@injectable()
class SiteValidator extends Validator<Site> {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository
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
