import { Run } from "../entities/Run";

interface ICreateRunDTO {
  contestnumber: number;
  runsitenumber: number;
  usernumber: number;
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
  autostdout?: string;
  autostderr?: string;
}

interface IUpdateRunDTO {
  runnumber: number;
  contestnumber?: number;
  runsitenumber?: number;
  usernumber?: number;
  rundate?: number;
  rundatediff?: number;
  rundatediffans?: number;
  runproblem?: number;
  runfilename?: string;
  rundata?: number;
  runanswer?: number;
  runstatus?: string;
  runjudge?: number;
  runjudgesite?: number;
  runanswer1: number;
  runjudge1?: number;
  runjudgesite1?: number;
  runanswer2: number;
  runjudge2?: number;
  runjudgesite2?: number;
  runlangnumber?: number;
  autoip?: string;
  autobegindate?: number;
  autoenddate?: number;
  autoanswer?: string;
  autostdout?: string;
  autostderr?: string;
}

interface ICountResult {
  max: string;
}

interface IRunsRepository {
  findByName(name: string): Promise<Run | undefined>;
  list(): Promise<Run[]>;
  create(run: ICreateRunDTO): Promise<void>;
  count(): Promise<number>;
  getById(id: number): Promise<Run | undefined>;
  update(run: IUpdateRunDTO): Promise<Run>;
  delete(contestnumber: number): Promise<void>;
}

export { IRunsRepository, ICreateRunDTO, ICountResult, IUpdateRunDTO };
