import { inject, injectable } from "tsyringe";

import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IRequest {
  id: number;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.getById(id);

    if (!userAlreadyExists) {
      throw new Error("User does not exists");
    }

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
