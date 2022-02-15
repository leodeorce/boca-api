import { inject, injectable } from "tsyringe";

import { Site } from "../../entities/Site";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";

@injectable()
class ListSitesUseCase {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository
  ) {}

  async execute(problemNumber: number): Promise<Site[]> {
    const sites = await this.sitesRepository.list(problemNumber);

    return sites;
  }
}

export { ListSitesUseCase };
