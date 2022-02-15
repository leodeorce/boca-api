import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import { GetProblemUseCase } from "../Problem/GetProblemUseCase";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { GetUserUseCase } from "./GetUserUseCase";
import { ListUsersUseCase } from "./ListUsersUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UserController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const { id_p } = request.params;

    try {
      const all = await listUsersUseCase.execute(parseInt(id_p, 10));
      return response.json(all);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const getUserUseCase = container.resolve(GetUserUseCase);
    const { id_user } = request.params;

    try {
      const user = await getUserUseCase.execute({
        id: parseInt(id_user, 10),
      });
      return response.json(user);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const getProblemUseCase = container.resolve(GetProblemUseCase);

    const { id_p } = request.params;

    const {
      usersitenumber,
      usernumber,
      userdate,
      userdatediff,
      userdatediffans,
      userfilename,
      userdata,
      useranswer,
      userstatus,
      userjudge,
      userjudgesite,
      useranswer1,
      userjudge1,
      userjudgesite1,
      useranswer2,
      userjudge2,
      userjudgesite2,
      userlangnumber,
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
      await createUserUseCase.execute({
        contestnumber: problem.contestnumber,
        usersitenumber,
        usernumber,
        userdate,
        userdatediff,
        userdatediffans,
        userproblem: parseInt(id_p, 10),
        userfilename,
        userdata,
        useranswer,
        userstatus,
        userjudge,
        userjudgesite,
        useranswer1,
        userjudge1,
        userjudgesite1,
        useranswer2,
        userjudge2,
        userjudgesite2,
        userlangnumber,
        autoip,
        autobegindate,
        autoenddate,
        autoanswer,
        autostdout,
        autostderr,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error creating User" });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const { id_user } = request.params;

    const {
      contestnumber,
      usersitenumber,
      usernumber,
      userdate,
      userproblem,
      userdatediff,
      userdatediffans,
      userfilename,
      userdata,
      useranswer,
      userstatus,
      userjudge,
      userjudgesite,
      useranswer1,
      userjudge1,
      userjudgesite1,
      useranswer2,
      userjudge2,
      userjudgesite2,
      userlangnumber,
      autoip,
      autobegindate,
      autoenddate,
      autoanswer,
      autostdout,
      autostderr,
    } = request.body;

    try {
      await updateUserUseCase.execute({
        usernumber: parseInt(id_user, 10),
        contestnumber,
        usersitenumber,
        usernumber,
        userdate,
        userdatediff,
        userdatediffans,
        userproblem,
        userfilename,
        userdata,
        useranswer,
        userstatus,
        userjudge,
        userjudgesite,
        useranswer1,
        userjudge1,
        userjudgesite1,
        useranswer2,
        userjudge2,
        userjudgesite2,
        userlangnumber,
        autoip,
        autobegindate,
        autoenddate,
        autoanswer,
        autostdout,
        autostderr,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error creating User" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id_user } = request.params;
    const idNumber = parseInt(id_user, 10);
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    try {
      await deleteUserUseCase.execute({ id: idNumber });
      return response.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }
}

export { UserController };
