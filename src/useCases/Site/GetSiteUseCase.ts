import { inject, injectable } from "tsyringe";

import { Site } from "../../entities/Site";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";

interface IRequest {
  id: number;
}

@injectable()
class GetSiteUseCase {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository
  ) {}

  async execute({ id }: IRequest): Promise<Site | undefined> {
    try {
      const site = await this.sitesRepository.getById(id);
      return site;
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export { GetSiteUseCase };