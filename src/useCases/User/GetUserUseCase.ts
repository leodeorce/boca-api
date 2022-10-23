import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IRequest {
  id: number;
}

@injectable()
class GetUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<User | undefined> {
    try {
      const user = await this.usersRepository.getById(id);
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { GetUserUseCase };
