import { Run } from "../entities/Run";

interface ICreateRunDTO {
  contestnumber: number;
  runsitenumber: number;
  usernumber: number;
  runnumber: number;
  rundate: number;
  rundatediff: number;
  rundatediffans: number;
  runproblem: number;
  runfilename: string;
  rundata: number;
  runanswer: number;
  runstatus: string;
  runjudge?: number;
  runjudgesite?: number;
  runanswer1: number;
  runjudge1?: number;
  runjudgesite1?: number;
  runanswer2: number;
  runjudge2?: number;
  runjudgesite2?: number;
  runlangnumber: number;
}

interface IUpdateRunDTO {
  contestnumber: number;
  runsitenumber: number;
  usernumber: number;
  runnumber: number;
  rundate: number;
  rundatediff: number;
  rundatediffans: number;
  runproblem: number;
  runfilename: string;
  rundata: number;
  runanswer: number;
  runstatus: string;
  runjudge?: number;
  runjudgesite?: number;
  runanswer1: number;
  runjudge1?: number;
  runjudgesite1?: number;
  runanswer2: number;
  runjudge2?: number;
  runjudgesite2?: number;
  runlangnumber: number;
  autoip?: string;
  autobegindate?: number;
  autoenddate?: number;
  autoanswer?: string;
  autostdout?: number;
  autostderr?: number;
}

interface ILastIdResult {
  id: number;
}

interface IRunsRepository {
  list(contestnumber: number, runproblem: number): Promise<Run[]>;
  create(createObject: ICreateRunDTO): Promise<Run>;
  createBlob(file: Buffer): Promise<number>;
  deleteBlob(oid: number): Promise<void>;
  getFileByOid(oid: number): Promise<Buffer | undefined>;
  getLastId(
    contestnumber: number,
    runproblem: number
  ): Promise<number | undefined>;
  getById(
    contestnumber: number,
    runproblem: number,
    runnumber: number
  ): Promise<Run | undefined>;
  update(run: IUpdateRunDTO): Promise<Run>;
  delete(
    contestnumber: number,
    runproblem: number,
    runnumber: number
  ): Promise<void>;
}

export { IRunsRepository, ICreateRunDTO, ILastIdResult, IUpdateRunDTO };
