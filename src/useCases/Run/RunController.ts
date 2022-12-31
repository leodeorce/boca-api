import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { QueryFailedError } from "typeorm";

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
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error getting run" });
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
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error getting Run" });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createRunUseCase = container.resolve(CreateRunUseCase);

    const { id_c } = request.params;
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

    try {
      await createRunUseCase.execute({
        contestnumber: Number(id_c),
        runproblem: Number(id_p),
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
      });

      return response.status(201).send();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
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
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
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
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error deleting run" });
    }
  }
}

export { RunController };
