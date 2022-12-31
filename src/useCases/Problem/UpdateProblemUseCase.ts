import { createHash } from "crypto";
import { UploadedFile } from "express-fileupload";
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
  probleminputfile?: UploadedFile;
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
    probleminputfile,
    fake,
    problemcolorname,
    problemcolor,
  }: IRequest): Promise<Problem> {
    await this.contestValidator.exists(contestnumber);

    let oid = null;
    let hash = null;

    if (probleminputfile !== undefined) {
      const arrayBuffer = probleminputfile.data;

      if (arrayBuffer == null || typeof arrayBuffer === "string") {
        throw ApiError.badRequest("File is invalid");
      }

      const data = new Uint8Array(arrayBuffer);
      hash = createHash("SHA1").update(data);

      oid = await this.problemsRepository.createBlob(arrayBuffer);
    }

    const problem = new Problem();

    problem.contestnumber = contestnumber;
    problem.problemnumber = problemnumber;
    problem.problemname = problemname;
    problem.fake = fake;
    problem.problembasefilename = problembasefilename;

    problem.probleminputfilename =
      probleminputfile !== undefined ? probleminputfile.name : "";

    problem.probleminputfilehash =
      hash === null ? undefined : hash.digest("hex");

    problem.probleminputfile = oid === null ? undefined : oid;

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
