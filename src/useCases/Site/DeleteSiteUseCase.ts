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

    await this.sitesRepository.delete(id);
  }
}

export { DeleteSiteUseCase };
