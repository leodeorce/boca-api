import { inject, injectable } from "tsyringe";

import { Contest } from "../../../entities/Contest";
import { ApiError } from "../../../errors/ApiError";
import { IContestsRepository } from "../../../repositories/IContestsRepository";
import EntityValidator from "./EntityValidator";

@injectable()
class ContestValidator extends EntityValidator<Contest> {
  constructor(
    @inject("ContestsRepository")
    private contestRepository: IContestsRepository
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
