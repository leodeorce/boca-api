import { inject, injectable } from "tsyringe";

import { User } from "../../../entities/User";
import { ApiError } from "../../../errors/ApiError";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import EntityValidator from "./EntityValidator";

@injectable()
class UserValidator extends EntityValidator<User> {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    super();
  }

  async exists(
    contestnumber: number,
    sitenumber: number,
    usernumber: number
  ): Promise<User> {
    const existingUser = await this.usersRepository.getById(
      contestnumber,
      sitenumber,
      usernumber
    );

    if (!existingUser) {
      throw ApiError.notFound("User does not exist");
    }

    return existingUser;
  }
}

export default UserValidator;
