import { inject, injectable } from "tsyringe";

import { SitesRepository } from "../../repositories/implementations/SitesRepository";

interface IRequest {
  id: number;
}

@injectable()
class DeleteSiteUseCase {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const siteAlreadyExists = await this.sitesRepository.getById(id);

    if (!siteAlreadyExists) {
      throw new Error("Site does not exists");
    }

    try {
      await this.sitesRepository.delete(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { DeleteSiteUseCase };
