import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(problemNumber: number): Promise<User[]> {
    const users = await this.usersRepository.list(problemNumber);

    return users;
  }
}

export { ListUsersUseCase };
