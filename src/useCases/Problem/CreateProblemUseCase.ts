import { container, inject, injectable } from "tsyringe";
import { createHash } from "node:crypto";

import { Problem } from "../../entities/Problem";
import { ApiError } from "../../errors/ApiError";
import { IProblemsRepository } from "../../repositories/IProblemsRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";
import { UploadedFile } from "express-fileupload";

interface IRequest {
  contestnumber: number;
  problemnumber: number;
  problemname: string;
  problemfullname?: string;
  problembasefilename?: string;
  probleminputfile: UploadedFile;
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
    probleminputfile,
    fake,
    problemcolorname,
    problemcolor,
  }: IRequest): Promise<Problem> {
    await this.contestValidator.exists(contestnumber);

    if (
      problemname === undefined ||
      fake === undefined ||
      problemnumber === undefined
    ) {
      throw ApiError.badRequest("Missing properties");
    }

    const probleminputfilename =
      probleminputfile !== undefined ? probleminputfile.name : "";
    problemfullname = problemfullname !== undefined ? problemfullname : "";
    problemcolorname = problemcolorname !== undefined ? problemcolorname : "";
    problemcolor = problemcolor !== undefined ? problemcolor : "";

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
    problem.problemfullname = problemfullname;
    problem.problembasefilename = problembasefilename;
    problem.probleminputfilename = probleminputfilename;
    problem.probleminputfile = oid != null ? oid : undefined;
    problem.probleminputfilehash =
      hash != null ? hash.digest("hex") : undefined;
    problem.fake = fake;
    problem.problemcolorname = problemcolorname;
    problem.problemcolor = problemcolor;

    await this.problemValidator.isValid(problem);

    return await this.problemsRepository.create({ ...problem });
  }
}

export { CreateProblemUseCase };
