import { inject, injectable } from "tsyringe";
import { QueryFailedError } from "typeorm";

import { WorkingsUserRepository } from "../../repositories/implementations/WorkingsUserRepository";

interface IRequest {
  contestnumber: number;
  sitenumber: number;
  workingnumber: number;
  users: number[];
}

@injectable()
class AddUsersToWorkingUseCase {
  constructor(
    @inject("WorkingsUserRepository")
    private workingsUserRepository: WorkingsUserRepository
  ) {}

  async execute({
    contestnumber,
    sitenumber,
    workingnumber,
    users,
  }: IRequest): Promise<void> {
    try {
      await this.workingsUserRepository.addUsersToWorking({
        contestnumber,
        sitenumber,
        workingnumber,
        users,
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { AddUsersToWorkingUseCase };
