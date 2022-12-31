import { Problem } from "../entities/Problem";

interface ICreateProblemDTO {
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

interface IUpdateProblemDTO {
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

interface ICountResult {
  max: number;
}

interface IProblemsRepository {
  findByName(name: string): Promise<Problem | undefined>;
  list(contestnumber?: number): Promise<Problem[]>;
  create(problem: ICreateProblemDTO): Promise<Problem>;
  createBlob(file: Buffer): Promise<number>;
  count(): Promise<number>;
  getById(
    contestnumber: number,
    problemnumber: number
  ): Promise<Problem | undefined>;
  update(problem: IUpdateProblemDTO): Promise<Problem>;
  delete(contestnumber: number, problemnumber: number): Promise<void>;
}

export {
  IProblemsRepository,
  ICreateProblemDTO,
  ICountResult,
  IUpdateProblemDTO,
};
