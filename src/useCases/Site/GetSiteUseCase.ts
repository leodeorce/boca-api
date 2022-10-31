import { inject, injectable } from "tsyringe";
import { Site } from "../../entities/Site";
import { ApiError } from "../../errors/ApiError";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";

interface IRequest {
  sitenumber: number;
  contestnumber: number;
}

@injectable()
class GetSiteUseCase {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository,
    @inject("ContestsRepository")
    private contestRepository: ContestsRepository
  ) {}

  async execute({
    sitenumber,
    contestnumber,
  }: IRequest): Promise<Site | undefined> {
    const existingContest = await this.contestRepository.getById(contestnumber);
    if (!existingContest) {
      throw ApiError.notFound("Contest does not exist");
    }

    const site = await this.sitesRepository.getById(sitenumber, contestnumber);
    if (!site) {
      throw ApiError.notFound("Site does not exist");
    }

    return site;
  }
}

export { GetSiteUseCase };
