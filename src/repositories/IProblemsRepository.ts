import { Problem } from "../entities/Problem";

interface ICreateProblemDTO {
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
  working_id?: number;
  updatetime: number;
}

interface IUpdateProblemDTO {
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
  updatetime: number;
}

interface ICountResult {
  max: number;
}

interface IProblemsRepository {
  findByName(name: string): Promise<Problem | undefined>;
  list(contestnumber?: number): Promise<Problem[]>;
  create(problem: ICreateProblemDTO): Promise<void>;
  count(): Promise<number>;
  getById(id: number): Promise<Problem | undefined>;
  update(problem: IUpdateProblemDTO): Promise<Problem>;
  delete(contestnumber: number): Promise<void>;
}

export {
  IProblemsRepository,
  ICreateProblemDTO,
  ICountResult,
  IUpdateProblemDTO,
};
