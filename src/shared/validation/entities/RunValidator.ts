import { inject, injectable } from "tsyringe";

import { ApiError } from "../../../errors/ApiError";

import { Run } from "../../../entities/Run";

import { IRunsRepository } from "../../../repositories/IRunsRepository";
import EntityValidator from "./EntityValidator";

@injectable()
class RunValidator extends EntityValidator<Run> {
  constructor(
    @inject("RunsRepository")
    private runsRepository: IRunsRepository
  ) {
    super();
  }

  async exists(
    contestnumber: number,
    runproblem: number,
    runnumber: number
  ): Promise<Run> {
    const existingRun = await this.runsRepository.getById(
      contestnumber,
      runproblem,
      runnumber
    );

    if (!existingRun) {
      throw ApiError.notFound("Run does not exist");
    }

    return existingRun;
  }
}

export default RunValidator;
