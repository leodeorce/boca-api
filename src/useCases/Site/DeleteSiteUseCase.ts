import { inject, injectable } from "tsyringe";
import { ApiError } from "../../errors/ApiError";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

import { SitesRepository } from "../../repositories/implementations/SitesRepository";

interface IRequest {
  sitenumber: number;
  contestnumber: number;
}

@injectable()
class DeleteSiteUseCase {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository,
    @inject("ContestsRepository")
    private contestRepository: ContestsRepository
  ) {}

  async execute({ sitenumber, contestnumber }: IRequest): Promise<void> {
    const existingContest = await this.contestRepository.getById(contestnumber);

    if (!existingContest) {
      throw ApiError.notFound("Contest does not exists");
    }

    const existingSite = await this.sitesRepository.getById(
      sitenumber,
      contestnumber
    );

    if (!existingSite) {
      throw ApiError.notFound("Site does not exists");
    }

    await this.sitesRepository.delete(sitenumber, contestnumber);
  }
}

export { DeleteSiteUseCase };
