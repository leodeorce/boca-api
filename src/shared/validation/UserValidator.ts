import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { ApiError } from "../../errors/ApiError";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import Validator from "./Validator";

@injectable()
class UserValidator extends Validator<User> {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
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
