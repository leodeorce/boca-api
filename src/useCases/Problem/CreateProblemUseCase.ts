import { container, inject, injectable } from "tsyringe";

import { ApiError } from "../../errors/ApiError";

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
class CreateProblemUseCase {
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

    const existingProblem = await this.problemsRepository.getById(
      contestnumber,
      problemnumber
    );

    if (existingProblem !== undefined) {
      throw ApiError.alreadyExists("Problem number is already in use");
    }

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

    return await this.problemsRepository.create({ ...problem });
  }
}

export { CreateProblemUseCase };
