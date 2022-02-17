import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { QueryFailedError } from "typeorm";

import { AddUsersToWorkingUseCase } from "./AddUsersToWorkingUseCase";
import { AddWorkingToUsersUseCase } from "./AddWorkingToUsersUseCase";
import { DeleteUserFromWorkingsUseCase } from "./DeleteUserFromWorkings";
import { DeleteWorkingFromUsersUseCase } from "./DeleteWorkingFromUsers";
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

    const { contestnumber, sitenumber, usernumbers } = request.body;
    try {
      await addUsersToWorkingUseCase.execute({
        contestnumber,
        sitenumber,
        usernumbers,
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

  async deleteUserFromWorkings(
    request: Request,
    response: Response
  ): Promise<Response> {
    const deleteUserFromWorkings = container.resolve(
      DeleteUserFromWorkingsUseCase
    );

    const { id_user } = request.params;

    const { contestnumber, sitenumber, workingnumbers } = request.body;

    try {
      await deleteUserFromWorkings.execute({
        contestnumber,
        sitenumber,
        usernumber: parseInt(id_user, 10),
        workingnumbers,
      });

      return response.status(204).send();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response
        .status(400)
        .json({ error: "Error deleting users from working" });
    }
  }

  async deleteWorkingFromUsers(request: Request, response: Response) {
    const deleteWorkingFromUsers = container.resolve(
      DeleteWorkingFromUsersUseCase
    );
    const { id_working } = request.params;

    const { contestnumber, sitenumber, usernumbers } = request.body;

    try {
      await deleteWorkingFromUsers.execute({
        contestnumber,
        sitenumber,
        usernumbers,
        workingnumber: parseInt(id_working, 10),
      });

      return response.status(204).send();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return response
          .status(400)
          .json({ message: error.message, detail: error.driverError });
      }
      return response
        .status(400)
        .json({ error: "Error Deleting Working from Users" });
    }
  }
}

export { UserWorkingController };
