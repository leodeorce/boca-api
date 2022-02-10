import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import { GetProblemUseCase } from "../Problem/GetProblemUseCase";
import { CreateRunUseCase } from "./CreateRunUseCase";
import { DeleteRunUseCase } from "./DeleteRunUseCase";
import { GetRunUseCase } from "./GetRunUseCase";
import { ListRunsUseCase } from "./ListRunsUseCase";
import { UpdateRunUseCase } from "./UpdateRunUseCase";

class RunController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const listRunsUseCase = container.resolve(ListRunsUseCase);

    const { id_p } = request.params;

    try {
      const all = await listRunsUseCase.execute(parseInt(id_p, 10));
      return response.json(all);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const getRunUseCase = container.resolve(GetRunUseCase);
    const { id_run } = request.params;

    try {
      const run = await getRunUseCase.execute({
        id: parseInt(id_run, 10),
      });
      return response.json(run);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createRunUseCase = container.resolve(CreateRunUseCase);
    const getProblemUseCase = container.resolve(GetProblemUseCase);

    const { id_p } = request.params;

    const {
      runsitenumber,
      usernumber,
      rundate,
      rundatediff,
      rundatediffans,
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
    } = request.body;

    const problem = await getProblemUseCase.execute({ id: parseInt(id_p, 10) });

    if (!problem) {
      throw new Error("Problem not found");
    }

    try {
      await createRunUseCase.execute({
        contestnumber: problem.contestnumber,
        runsitenumber,
        usernumber,
        rundate,
        rundatediff,
        rundatediffans,
        runproblem: parseInt(id_p, 10),
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

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error creating Run" });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateRunUseCase = container.resolve(UpdateRunUseCase);

    const { id_run } = request.params;

    const {
      contestnumber,
      runsitenumber,
      usernumber,
      rundate,
      runproblem,
      rundatediff,
      rundatediffans,
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
    } = request.body;

    try {
      await updateRunUseCase.execute({
        runnumber: parseInt(id_run, 10),
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
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error creating Run" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id_run } = request.params;
    const idNumber = parseInt(id_run, 10);
    const deleteRunUseCase = container.resolve(DeleteRunUseCase);

    try {
      await deleteRunUseCase.execute({ id: idNumber });
      return response.status(200).json({ message: "Run deleted successfully" });
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }
}

export { RunController };
