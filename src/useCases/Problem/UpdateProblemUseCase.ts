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
    fake,
    problemcolorname,
    problemcolor,
  }: IRequest): Promise<Problem> {
    await this.contestValidator.exists(contestnumber);
    await this.problemValidator.exists(contestnumber, problemnumber);

    const problem = new Problem();

    problem.contestnumber = contestnumber;
    problem.problemnumber = problemnumber;
    problem.problemname = problemname;
    problem.fake = fake;
    problem.problembasefilename = problembasefilename;
    problem.probleminputfilename = "";
    problem.probleminputfile = undefined;
    problem.probleminputfilehash = undefined;

    problem.problemcolorname =
      problemcolorname === undefined ? "" : problemcolorname;

    problem.problemcolor = problemcolor === undefined ? "" : problemcolor;

    problem.problemfullname =
      problemfullname === undefined ? "" : problemfullname;

    await this.problemValidator.isValid(problem);

    return await this.problemsRepository.update({ ...problem });
  }
}

export { UpdateProblemsUseCase };
