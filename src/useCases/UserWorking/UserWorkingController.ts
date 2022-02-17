import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { QueryFailedError } from "typeorm";

import { AddUsersToWorkingUseCase } from "./AddUsersToWorkingUseCase";
import { AddWorkingToUsersUseCase } from "./AddWorkingToUsersUseCase";
import { ListUsersByWorkingUseCase } from "./ListUsersByWorkingUseCase";
import { ListWorkingsByUserUseCase } from "./ListWorkingsByUserUseCase";

class UserWorkingController {
  async listWorkingsByUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listWorkings = container.resolve(ListWorkingsByUserUseCase);

    const { id_user } = request.params;

    try {
      const workings = await listWorkings.execute(parseInt(id_user, 10));
      return response.json(workings);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error getting Workings" });
    }
  }

  async listUsersByWorking(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listUsers = container.resolve(ListUsersByWorkingUseCase);

    const { id_working } = request.params;

    try {
      const workings = await listUsers.execute(parseInt(id_working, 10));
      return response.json(workings);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response.status(400).json({ error: "Error getting Users" });
    }
  }

  async addUsersToWorking(
    request: Request,
    response: Response
  ): Promise<Response> {
    const addUsersToWorkingUseCase = container.resolve(
      AddUsersToWorkingUseCase
    );

    const { id_working } = request.params;

    const { contestnumber, sitenumber, users } = request.body;

    try {
      await addUsersToWorkingUseCase.execute({
        contestnumber,
        sitenumber,
        users,
        workingnumber: parseInt(id_working, 10),
      });

      return response.status(201).send();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response
        .status(400)
        .json({ error: "Error adding users to Working" });
    }
  }

  async addWorkingToUsers(
    request: Request,
    response: Response
  ): Promise<Response> {
    const addWorkingToUsersUseCase = container.resolve(
      AddWorkingToUsersUseCase
    );

    const { id_user } = request.params;

    const { contestnumber, sitenumber, workingnumbers } = request.body;

    try {
      await addWorkingToUsersUseCase.execute({
        contestnumber,
        sitenumber,
        usernumber: parseInt(id_user, 10),
        workingnumbers,
      });

      return response.status(201).send();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response
        .status(400)
        .json({ error: "Error adding Working to users" });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    // const updateWorkingUseCase = container.resolve(UpdateWorkingUseCase);
    // const { id_working } = request.params;
    // const {
    //   name,
    //   start_date,
    //   end_date,
    //   last_answer_date,
    //   max_file_size,
    //   is_multilogin,
    // } = request.body;
    // try {
    //   await updateWorkingUseCase.execute({
    //     workingnumber: parseInt(id_working, 10),
    //     name,
    //     start_date,
    //     end_date,
    //     last_answer_date,
    //     max_file_size,
    //     is_multilogin,
    //   });
    //   return response.status(201).send();
    // } catch (error) {
    //   return response.status(400).json({ error: "Error updating Working" });
    // }
  }

  async delete(request: Request, response: Response) {
    // const deleteWorkingUseCase = container.resolve(DeleteWorkingUseCase);
    // const { id_working } = request.params;
    // const idNumber = parseInt(id_working, 10);
    // try {
    //   await deleteWorkingUseCase.execute({ id: idNumber });
    //   return response
    //     .status(200)
    //     .json({ message: "Working deleted successfully" });
    // } catch (error) {
    //   const err = error as Error;
    //   return response.status(400).json({ error: err.message });
    // }
  }
}

export { UserWorkingController };
