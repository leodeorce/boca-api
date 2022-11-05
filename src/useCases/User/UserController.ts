import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { ApiError } from "../../errors/ApiError";

import { GetContestsUseCase } from "../Contest/GetContestUseCase";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { GetUserUseCase } from "./GetUserUseCase";
import { ListUsersUseCase } from "./ListUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UserController {
  async listAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const { id_c } = request.params;

    try {
      const all = await listUsersUseCase.execute(parseInt(id_c, 10));
      return response.json(all);
    } catch (error) {
      next(error);
    }
  }

  async getOne(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const getUserUseCase = container.resolve(GetUserUseCase);
    const { id_user } = request.params;

    try {
      const user = await getUserUseCase.execute({
        id: parseInt(id_user, 10),
      });
      return response.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { id_c } = request.params;
    const { id_s } = request.params;
    const contestnumber = Number(id_c);
    const sitenumber = Number(id_s);

    const {
      username,
      userfullname,
      userdesc,
      usertype,
      userenabled,
      usermultilogin,
      userpassword,
      userip,
      userlastlogin,
      usersession,
      usersessionextra,
      userlastlogout,
      userpermitip,
      userinfo,
      usercpcid,
    } = request.body;

    try {
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }

      const user = await createUserUseCase.execute({
        contestnumber: contestnumber,
        usersitenumber: sitenumber,
        username,
        userfullname,
        userdesc,
        usertype,
        userenabled,
        usermultilogin,
        userpassword,
        userip,
        userlastlogin,
        usersession,
        usersessionextra,
        userlastlogout,
        userpermitip,
        userinfo,
        usercpcid,
      });

      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const { id_user } = request.params;

    const {
      contestnumber,
      usersitenumber,
      username,
      userfullname,
      userdesc,
      usertype,
      userenabled,
      usermultilogin,
      userpassword,
      userip,
      userlastlogin,
      usersession,
      usersessionextra,
      userlastlogout,
      userpermitip,
      userinfo,
      usercpcid,
    } = request.body;

    try {
      await updateUserUseCase.execute({
        contestnumber,
        usersitenumber,
        usernumber: parseInt(id_user, 10),
        username,
        userfullname,
        userdesc,
        usertype,
        userenabled,
        usermultilogin,
        userpassword,
        userip,
        userlastlogin,
        usersession,
        usersessionextra,
        userlastlogout,
        userpermitip,
        userinfo,
        usercpcid,
      });

      return response.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const { id_user } = request.params;
    const idNumber = parseInt(id_user, 10);
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    try {
      await deleteUserUseCase.execute({ id: idNumber });
      return response
        .status(200)
        .json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
