import { container, inject, injectable } from "tsyringe";

import { ApiError } from "../../errors/ApiError";

import { IRunsRepository } from "../../repositories/IRunsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";
import RunValidator from "../../shared/validation/entities/RunValidator";

interface IRequest {
  contestnumber: number;
  runproblem: number;
  runnumber: number;
}

interface IFile {
  filename: string;
  oid: number;
  buffer: Buffer;
}

@injectable()
class GetRunFileUseCase {
  private contestValidator: ContestValidator;
  private problemValidator: ProblemValidator;
  private runValidator: RunValidator;

  constructor(
    @inject("RunsRepository")
    private runsRepository: IRunsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.problemValidator = container.resolve(ProblemValidator);
    this.runValidator = container.resolve(RunValidator);
  }

  async execute({
    contestnumber,
    runproblem,
    runnumber,
  }: IRequest): Promise<IFile> {
    await this.contestValidator.exists(contestnumber);
    await this.problemValidator.exists(contestnumber, runproblem);

    const existingRun = await this.runValidator.exists(
      contestnumber,
      runproblem,
      runnumber
    );

    if (typeof existingRun.rundata !== "number") {
      throw ApiError.notFound("Run has no file");
    }

    if (
      existingRun.runfilename === undefined ||
      existingRun.runfilename === null
    ) {
      throw ApiError.inconsistency("Run file name is invalid");
    }

    const buffer = await this.runsRepository.getFileByOid(existingRun.rundata);

    if (buffer === undefined) {
      throw ApiError.inconsistency("Run file is missing");
    }

    return {
      filename: existingRun.runfilename,
      oid: existingRun.rundata,
      buffer: buffer,
    };
  }
}

export { GetRunFileUseCase };
