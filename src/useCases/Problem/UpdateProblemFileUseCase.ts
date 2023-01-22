import { container, inject, injectable } from "tsyringe";
import { createHash } from "node:crypto";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../../errors/ApiError";

import { Problem } from "../../entities/Problem";

import { IProblemsRepository } from "../../repositories/IProblemsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";

interface IRequest {
  contestnumber: number;
  problemnumber: number;
  probleminputfile: UploadedFile;
}

@injectable()
class UpdateProblemFileUseCase {
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
    probleminputfile,
  }: IRequest): Promise<Problem> {
    await this.contestValidator.exists(contestnumber);
    const existingProblem = await this.problemValidator.exists(
      contestnumber,
      problemnumber
    );

    const probleminputfilename = probleminputfile.name;

    let oid = null;
    let hash = null;

    const arrayBuffer = probleminputfile.data;

    if (arrayBuffer == null || typeof arrayBuffer === "string") {
      throw ApiError.badRequest("File is invalid");
    }

    const data = new Uint8Array(arrayBuffer);
    hash = createHash("SHA1").update(data);

    oid = await this.problemsRepository.createBlob(arrayBuffer);

    const problem = new Problem();
    problem.contestnumber = contestnumber;
    problem.problemnumber = problemnumber;
    problem.problemname = existingProblem.problemname;
    problem.probleminputfilename = probleminputfilename;
    problem.probleminputfile = oid;
    problem.fake = existingProblem.fake;
    problem.problemcolorname = existingProblem.problemcolorname;
    problem.problemcolor = existingProblem.problemcolor;

    problem.probleminputfilehash = hash.digest("hex");

    problem.problemfullname =
      existingProblem.problemfullname !== undefined
        ? existingProblem.problemfullname
        : "";

    problem.problembasefilename =
      existingProblem.problembasefilename != null
        ? existingProblem.problembasefilename
        : undefined;

    await this.problemValidator.isValid(problem);

    const updatedProblem = await this.problemsRepository.update({ ...problem });

    if (
      existingProblem.probleminputfile !== undefined &&
      existingProblem.probleminputfile != null
    ) {
      await this.problemsRepository.deleteBlob(
        existingProblem.probleminputfile
      );
    }

    return updatedProblem;
  }
}

export { UpdateProblemFileUseCase };
