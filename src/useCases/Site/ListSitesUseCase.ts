import { inject, injectable } from "tsyringe";
import { Site } from "../../entities/Site";
import { ApiError } from "../../errors/ApiError";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";

interface IRequest {
  contestnumber: number;
}

@injectable()
class ListSitesUseCase {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository,
    @inject("ContestsRepository")
    private contestRepository: ContestsRepository
  ) {}

  async execute({ contestnumber }: IRequest): Promise<Site[]> {
    const existingContest = await this.contestRepository.getById(contestnumber);
    if (!existingContest) {
      throw ApiError.notFound("Contest does not exist");
    }

    return await this.sitesRepository.list(contestnumber);
  }
}

export { ListSitesUseCase };
