import { inject, injectable } from "tsyringe";

import { Problem } from "../../../entities/Problem";
import { ApiError } from "../../../errors/ApiError";
import { IProblemsRepository } from "../../../repositories/IProblemsRepository";
import EntityValidator from "./EntityValidator";

@injectable()
class ProblemValidator extends EntityValidator<Problem> {
  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: IProblemsRepository
  ) {
    super();
  }

  async exists(contestnumber: number, problemnumber: number): Promise<Problem> {
    const existingProblem = await this.problemsRepository.getById(
      contestnumber,
      problemnumber
    );

    if (!existingProblem) {
      throw ApiError.notFound("Problem does not exist");
    }

    return existingProblem;
  }
}

export default ProblemValidator;
