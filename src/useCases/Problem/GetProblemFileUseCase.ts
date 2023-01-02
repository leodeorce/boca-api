import { container, inject, injectable } from "tsyringe";

import { ApiError } from "../../errors/ApiError";

import { IProblemsRepository } from "../../repositories/IProblemsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";

interface IRequest {
  contestnumber: number;
  problemnumber: number;
}

interface IFile {
  filename: string;
  oid: number;
  buffer: Buffer;
}

@injectable()
class GetProblemFileUseCase {
  private contestValidator: ContestValidator;
  private problemValidator: ProblemValidator;

  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: IProblemsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.problemValidator = container.resolve(ProblemValidator);
  }

  async execute({ contestnumber, problemnumber }: IRequest): Promise<IFile> {
    await this.contestValidator.exists(contestnumber);

    const problem = await this.problemValidator.exists(
      contestnumber,
      problemnumber
    );

    if (typeof problem.probleminputfile !== "number") {
      throw ApiError.notFound("Problem has no file");
    }

    if (
      problem.probleminputfilename === undefined ||
      problem.probleminputfilename === null
    ) {
      throw ApiError.inconsistency("Problem file name is invalid");
    }

    const buffer = await this.problemsRepository.getFileByOid(
      problem.probleminputfile
    );

    if (buffer === undefined) {
      throw ApiError.inconsistency("Problem file is missing");
    }

    return {
      filename: problem.probleminputfilename,
      oid: problem.probleminputfile,
      buffer: buffer,
    };
  }
}

export { GetProblemFileUseCase };
