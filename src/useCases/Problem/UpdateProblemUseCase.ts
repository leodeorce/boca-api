import { inject, injectable } from "tsyringe";

import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";

interface IRequest {
  problemnumber: number;
  problemname: string;
  problemfullname: string;
  problembasefilename?: string;
  probleminputfilename?: string;
  probleminputfile: number;
  probleminputfilehash: string;
  fake: boolean;
  problemcolorname: string;
  problemcolor: string;
  working_id?: number;
}

@injectable()
class UpdateProblemsUseCase {
  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: ProblemsRepository
  ) {}

  async execute({
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
    working_id,
  }: IRequest): Promise<void> {
    const problemAlreadyExists = await this.problemsRepository.getById(
      problemnumber
    );

    if (!problemAlreadyExists) {
      throw new Error("Problem not found");
    }
    try {
      await this.problemsRepository.update({
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
        working_id,
      });
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export { UpdateProblemsUseCase };
