import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { WorkingsUserRepository } from "../../repositories/implementations/WorkingsUserRepository";

@injectable()
class ListUsersByWorkingUseCase {
  constructor(
    @inject("WorkingsUserRepository")
    private workingsUserRepository: WorkingsUserRepository
  ) {}

  async execute(workingNumber: number): Promise<User[]> {
    const users = await this.workingsUserRepository.getUsersByWorkings(
      workingNumber
    );

    if (users === undefined) {
      return [];
    }

    return users;
  }
}

export { ListUsersByWorkingUseCase };
