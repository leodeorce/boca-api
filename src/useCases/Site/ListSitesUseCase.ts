import { container, inject, injectable } from "tsyringe";
import { Site } from "../../entities/Site";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";
import ContestValidator from "../../shared/validation/ContestValidator";

interface IRequest {
  contestnumber: number;
}

@injectable()
class ListSitesUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
  }

  async execute({ contestnumber }: IRequest): Promise<Site[]> {
    await this.contestValidator.exists(contestnumber);
    return await this.sitesRepository.list(contestnumber);
  }
}

export { ListSitesUseCase };
