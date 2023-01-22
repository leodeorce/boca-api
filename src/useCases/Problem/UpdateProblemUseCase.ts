import { container, inject, injectable } from "tsyringe";

import { Problem } from "../../entities/Problem";

import { IProblemsRepository } from "../../repositories/IProblemsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";

interface IRequest {
  contestnumber: number;
  problemnumber: number;
  problemname: string;
  problemfullname?: string;
  problembasefilename?: string;
  probleminputfilename?: string;
  probleminputfile?: number;
  probleminputfilehash?: string;
  fake: boolean;
  problemcolorname?: string;
  problemcolor?: string;
}

@injectable()
class UpdateProblemsUseCase {
  private contestValidator: ContestValidator;
  private problemValidator: ProblemValidator;

  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: IProblemsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.problemValidator = container.resolve(ProblemValidator);
  }

  async execute({
    contestnumber,
    problemnumber,
    problemname,
    problemfullname,
    problembasefilename,
    probleminputfilename,
    probleminputfile,
    probleminputfilehash,
    fake,
    problemcolorname,
    problemcolor,
  }: IRequest): Promise<Problem> {
    await this.contestValidator.exists(contestnumber);
    const existingProblem = await this.problemValidator.exists(
      contestnumber,
      problemnumber
    );

    probleminputfilename =
      probleminputfilename !== undefined
        ? probleminputfilename
        : existingProblem.probleminputfilename;
    probleminputfile =
      probleminputfile !== undefined
        ? probleminputfile
        : existingProblem.probleminputfile;
    probleminputfilehash =
      probleminputfilehash !== undefined
        ? probleminputfilehash
        : existingProblem.probleminputfilehash;

    const problem = new Problem(
      contestnumber,
      problemnumber,
      problemname,
      problemfullname,
      problembasefilename,
      probleminputfilename,
      probleminputfile,
      probleminputfilehash,
      fake,
      problemcolorname,
      problemcolor
    );

    await this.problemValidator.isValid(problem);

    return await this.problemsRepository.update({ ...problem });
  }
}

export { UpdateProblemsUseCase };
