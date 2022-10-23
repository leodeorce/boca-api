import { inject, injectable } from "tsyringe";

import { Site } from "../../entities/Site";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";

@injectable()
class ListSitesUseCase {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository
  ) {}

  async execute(contestNumber: number): Promise<Site[]> {
    try {
      const sites = await this.sitesRepository.list(contestNumber);
      return sites;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { ListSitesUseCase };
