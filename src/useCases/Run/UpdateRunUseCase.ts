import { container, inject, injectable } from "tsyringe";

import { Run } from "../../entities/Run";

import { IRunsRepository } from "../../repositories/IRunsRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import ProblemValidator from "../../shared/validation/entities/ProblemValidator";
import RunValidator from "../../shared/validation/entities/RunValidator";

interface IRequest {
  contestnumber: number;
  runproblem: number;
  runnumber: number;
  runanswer?: number;
  runstatus: string;
  runjudge?: number;
  runjudgesite?: number;
  runanswer1?: number;
  runjudge1?: number;
  runjudgesite1?: number;
  runanswer2?: number;
  runjudge2?: number;
  runjudgesite2?: number;
  autoip?: string;
  autobegindate?: number;
  autoenddate?: number;
  autoanswer?: string;
  autostdout?: number;
  autostderr?: number;
}

@injectable()
class UpdateRunUseCase {
  private contestValidator: ContestValidator;
  private problemValidator: ProblemValidator;
  private runValidator: RunValidator;

  constructor(
    @inject("RunsRepository")
    private runsRepository: IRunsRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.problemValidator = container.resolve(ProblemValidator);
    this.runValidator = container.resolve(RunValidator);
  }

  async execute({
    contestnumber,
    runproblem,
    runnumber,
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
    autoip,
    autobegindate,
    autoenddate,
    autoanswer,
    autostdout,
    autostderr,
  }: IRequest): Promise<Run> {
    await this.contestValidator.exists(contestnumber);
    await this.problemValidator.exists(contestnumber, runproblem);
    
    const existingRun = await this.runValidator.exists(
      contestnumber,
      runproblem,
      runnumber
    );

    const run = new Run();

    run.contestnumber = contestnumber;
    run.runproblem = runproblem;
    run.runsitenumber = existingRun.runsitenumber;
    run.usernumber = existingRun.usernumber;
    run.rundate = existingRun.rundate;
    run.runfilename = existingRun.runfilename;
    run.rundata = existingRun.rundata;
    run.runlangnumber = existingRun.runlangnumber;
    run.rundatediff = existingRun.rundatediff;
    run.rundatediffans = existingRun.rundatediffans;
    run.runjudge = runjudge;
    run.runjudgesite = runjudgesite;
    run.runjudge1 = runjudge1;
    run.runjudgesite1 = runjudgesite1;
    run.runjudge2 = runjudge2;
    run.runjudgesite2 = runjudgesite2;
    run.autoip = autoip;
    run.autobegindate = autobegindate;
    run.autoenddate = autoenddate;
    run.autoanswer = autoanswer;
    run.autostdout = autostdout;
    run.autostderr = autostderr;

    run.runanswer = runanswer !== undefined ? runanswer : 0;
    run.runstatus = runstatus !== undefined ? runstatus : "openrun";
    run.runanswer1 = runanswer1 !== undefined ? runanswer1 : 0;
    run.runanswer2 = runanswer2 !== undefined ? runanswer2 : 0;

    run.runnumber = runnumber;

    await this.runValidator.isValid(run);

    return await this.runsRepository.update({ ...run });
  }
}

export { UpdateRunUseCase };
