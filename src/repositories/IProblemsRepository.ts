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

interface IProblemsRepository {
  getFileByOid(oid: number): Promise<Buffer | undefined>;
  list(contestnumber: number): Promise<Problem[]>;
  create(problem: ICreateProblemDTO): Promise<Problem>;
  createBlob(file: Buffer): Promise<number>;
  deleteBlob(oid: number): Promise<void>;
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
  IUpdateProblemDTO,
};
