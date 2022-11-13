import { inject, injectable } from "tsyringe";
import { Contest } from "../../../entities/Contest";
import { ApiError } from "../../../errors/ApiError";
import { ContestsRepository } from "../../../repositories/implementations/ContestsRepository";
import EntityValidator from "./EntityValidator";

@injectable()
class ContestValidator extends EntityValidator<Contest> {
  constructor(
    @inject("ContestsRepository")
    private contestRepository: ContestsRepository
  ) {
    super();
  }

  async exists(contestnumber: number): Promise<Contest> {
    const existingContest = await this.contestRepository.getById(contestnumber);

    if (!existingContest) {
      throw ApiError.notFound("Contest does not exist");
    }

    return existingContest;
  }
}

export default ContestValidator;