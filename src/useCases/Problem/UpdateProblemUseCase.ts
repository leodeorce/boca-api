import { inject, injectable } from "tsyringe";

import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";

interface IRequest {
  contestnumber: number;
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
}

@injectable()
class UpdateProblemsUseCase {
  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: ProblemsRepository
  ) {}

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
  }: IRequest): Promise<void> {
    const problemAlreadyExists = await this.problemsRepository.getById(
      contestnumber,
      problemnumber
    );

    if (!problemAlreadyExists) {
      throw new Error("Problem not found");
    }
    try {
      await this.problemsRepository.update({
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
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { UpdateProblemsUseCase };
