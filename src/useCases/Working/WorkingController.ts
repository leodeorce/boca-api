import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { QueryFailedError } from "typeorm";

import { CreateWorkingUseCase } from "./CreateWorkingUseCase";
import { DeleteWorkingUseCase } from "./DeleteWorkingUseCase";
import { GetWorkingUseCase } from "./GetWorkingUseCase";
import { ListWorkingsUseCase } from "./ListWorkingsUseCase";
import { UpdateWorkingUseCase } from "./UpdateWorkingUseCase";

class WorkingController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const listWorkingsUseCase = container.resolve(ListWorkingsUseCase);

    const { id_c } = request.params;

    try {
      const all = await listWorkingsUseCase.execute(parseInt(id_c, 10));
      return response.json(all);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error getting Working" });
    }
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const getWorkingUseCase = container.resolve(GetWorkingUseCase);
    const { id_working } = request.params;

    try {
      const working = await getWorkingUseCase.execute({
        id: parseInt(id_working, 10),
      });
      return response.json(working);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.json({ error: "Error getting Working" });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createWorkingUseCase = container.resolve(CreateWorkingUseCase);

    const { id_c } = request.params;

    const {
      name,
      start_date,
      end_date,
      last_answer_date,
      max_file_size,
      is_multilogin,
    } = request.body;

    try {
      await createWorkingUseCase.execute({
        contestnumber: parseInt(id_c, 10),
        name,
        start_date,
        end_date,
        last_answer_date,
        max_file_size,
        is_multilogin,
      });

      return response.status(201).send();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error creating Working" });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateWorkingUseCase = container.resolve(UpdateWorkingUseCase);

    const { id_working } = request.params;

    const {
      name,
      start_date,
      end_date,
      last_answer_date,
      max_file_size,
      is_multilogin,
    } = request.body;

    try {
      await updateWorkingUseCase.execute({
        workingnumber: parseInt(id_working, 10),
        name,
        start_date,
        end_date,
        last_answer_date,
        max_file_size,
        is_multilogin,
      });

      return response.status(201).send();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error updating Working" });
    }
  }

  async delete(request: Request, response: Response) {
    const deleteWorkingUseCase = container.resolve(DeleteWorkingUseCase);

    const { id_working } = request.params;
    const idNumber = parseInt(id_working, 10);

    try {
      await deleteWorkingUseCase.execute({ id: idNumber });
      return response
        .status(200)
        .json({ message: "Working deleted successfully" });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error deleting Working" });
    }
  }
}

export { WorkingController };
