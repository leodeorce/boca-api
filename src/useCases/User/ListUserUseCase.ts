import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(contestNumber: number): Promise<User[]> {
    try {
      const users = await this.usersRepository.list(contestNumber);
      return users;
      
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export { ListUsersUseCase };
