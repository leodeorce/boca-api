import { inject, injectable } from "tsyringe";

import { RunsRepository } from "../../repositories/implementations/RunsRepository";

interface IRequest {
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

@injectable()
class CreateRunUseCase {
  constructor(
    @inject("RunsRepository")
    private runsRepository: RunsRepository
  ) {}

  async execute({
    contestnumber,
    runsitenumber,
    usernumber,
    rundate,
    rundatediff,
    rundatediffans,
    runproblem,
    runfilename,
    rundata,
    runanswer,
    runstatus,
    runjudge,
    runjudgesite,
    runanswer1,
    runjudge1,
    runjudgesite1,
    runanswer2,
    runjudge2,
    runjudgesite2,
    runlangnumber,
    autoip,
    autobegindate,
    autoenddate,
    autoanswer,
    autostdout,
    autostderr,
  }: IRequest): Promise<void> {
    const count = (await this.runsRepository.count()) + 1;

    try {
      await this.runsRepository.create({
        contestnumber,
        runsitenumber,
        runnumber: count,
        usernumber,
        rundate,
        rundatediff,
        rundatediffans,
        runproblem,
        runfilename,
        rundata,
        runanswer,
        runstatus,
        runjudge,
        runjudgesite,
        runanswer1,
        runjudge1,
        runjudgesite1,
        runanswer2,
        runjudge2,
        runjudgesite2,
        runlangnumber,
        autoip,
        autobegindate,
        autoenddate,
        autoanswer,
        autostdout,
        autostderr,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { CreateRunUseCase };
