import { inject, injectable } from "tsyringe";

import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";

interface IRequest {
  contestnumber: number;
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
class CreateProblemUseCase {
  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: ProblemsRepository
  ) {}

  async execute({
    contestnumber,
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
    const contestAlreadyExists = await this.problemsRepository.findByName(
      problemname
    );

    if (contestAlreadyExists) {
      throw new Error("Problem with that name already exists");
    }
    const count = (await this.problemsRepository.count()) + 1;

    try {
      await this.problemsRepository.create({
        contestnumber,
        problemnumber: count,
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
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export { CreateProblemUseCase };
