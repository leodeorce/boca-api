import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { ApiError } from "../../errors/ApiError";

import { CreateUserUseCase } from "./CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { GetUserUseCase } from "./GetUserUseCase";
import { ListUsersUseCase } from "./ListUserUseCase";
import { PatchUserUseCase } from "./PatchUserUseCase";
import { ReplaceUserUseCase } from "./ReplaceUserUseCase";

class UserController {
  async listAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const { id_c } = request.params;
    const { id_s } = request.params;
    const contestnumber = Number(id_c);
    const sitenumber = Number(id_s);

    try {
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }

      const all = await listUsersUseCase.execute({
        contestnumber,
        usersitenumber: sitenumber,
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

    const { id_c } = request.params;
    const { id_s } = request.params;
    const contestnumber = Number(id_c);
    const sitenumber = Number(id_s);

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
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }

      const user = await createUserUseCase.execute({
        contestnumber: contestnumber,
        usersitenumber: sitenumber,
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

  async updateFull(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const replaceUserUseCase = container.resolve(ReplaceUserUseCase);

    const { id_c } = request.params;
    const { id_s } = request.params;
    const { id_user } = request.params;
    const contestnumber = Number(id_c);
    const sitenumber = Number(id_s);
    const usernumber = Number(id_user);

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
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }
      if (Number.isNaN(usernumber) || usernumber < 1) {
        throw ApiError.badRequest("Invalid user ID");
      }

      const updatedUser = await replaceUserUseCase.execute({
        contestnumber,
        usersitenumber: sitenumber,
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
  
  async updatePartial(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const patchUserUseCase = container.resolve(PatchUserUseCase);

    const { id_c } = request.params;
    const { id_s } = request.params;
    const { id_user } = request.params;
    const contestnumber = Number(id_c);
    const sitenumber = Number(id_s);
    const usernumber = Number(id_user);

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
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }
      if (Number.isNaN(usernumber) || usernumber < 1) {
        throw ApiError.badRequest("Invalid user ID");
      }

      const updatedUser = await patchUserUseCase.execute({
        contestnumber,
        usersitenumber: sitenumber,
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
