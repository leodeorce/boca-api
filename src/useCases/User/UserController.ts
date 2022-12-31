import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { ApiError } from "../../errors/ApiError";
import { UserRequestValidator } from "../../shared/validation/requests/UserRequestValidator";
import IdValidator from "../../shared/validation/utils/IdValidator";

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
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_s } = request.params;
    const contestnumber = Number(id_c);
    const usersitenumber = Number(id_s);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isSiteId(usersitenumber);

      const all = await listUsersUseCase.execute({
        contestnumber,
        usersitenumber,
      });

      return response.status(200).json(all);
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
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const { id_s } = request.params;
    const { id_u } = request.params;
    const contestnumber = Number(id_c);
    const sitenumber = Number(id_s);
    const usernumber = Number(id_u);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isSiteId(sitenumber);
      idValidator.isUserId(usernumber);

      const user = await getUserUseCase.execute({
        contestnumber,
        sitenumber,
        usernumber,
      });

      return response.status(200).json(user);
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
    const idValidator = container.resolve(IdValidator);
    const userRequestValidator = container.resolve(UserRequestValidator);

    const { id_c } = request.params;
    const { id_s } = request.params;
    const contestnumber = Number(id_c);
    const usersitenumber = Number(id_s);

    const {
      username,
      usernumber,
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
      usericpcid,
    } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isSiteId(usersitenumber);
      userRequestValidator.hasRequiredCreateProperties(request.body);

      const user = await createUserUseCase.execute({
        contestnumber,
        usersitenumber,
        usernumber,
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
        usericpcid,
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
    const idValidator = container.resolve(IdValidator);
    const userRequestValidator = container.resolve(UserRequestValidator);

    const { id_c } = request.params;
    const { id_s } = request.params;
    const { id_u } = request.params;
    const contestnumber = Number(id_c);
    const usersitenumber = Number(id_s);
    const usernumber = Number(id_u);

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
      usericpcid,
    } = request.body;

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isSiteId(usersitenumber);
      idValidator.isUserId(usernumber);
      userRequestValidator.hasRequiredUpdateProperties(request.body);

      const updatedUser = await updateUserUseCase.execute({
        contestnumber,
        usersitenumber,
        usernumber,
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
        usericpcid,
      });

      return response.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    const { id_c } = request.params;
    const { id_s } = request.params;
    const { id_user } = request.params;
    const contestnumber = Number(id_c);
    const sitenumber = Number(id_s);
    const usernumber = Number(id_user);

    try {
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }
      if (Number.isNaN(usernumber) || usernumber < 1) {
        throw ApiError.badRequest("Invalid user ID");
      }

      await deleteUserUseCase.execute({
        contestnumber,
        usersitenumber: sitenumber,
        usernumber,
      });

      return response.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
