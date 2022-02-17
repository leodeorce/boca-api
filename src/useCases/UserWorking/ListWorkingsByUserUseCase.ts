import { inject, injectable } from "tsyringe";

import { Working } from "../../entities/Working";
import { WorkingsUserRepository } from "../../repositories/implementations/WorkingsUserRepository";

@injectable()
class ListWorkingsByUserUseCase {
  constructor(
    @inject("WorkingsUserRepository")
    private workingsUserRepository: WorkingsUserRepository
  ) {}

  async execute(userNumber: number): Promise<Working[]> {
    const workings = await this.workingsUserRepository.getWorkingsByUsers(
      userNumber
    );

    if (workings === undefined) {
      return [];
    }

    return workings;
  }
}

export { ListWorkingsByUserUseCase };
