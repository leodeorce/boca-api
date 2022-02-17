import { inject, injectable } from "tsyringe";

import { WorkingsUserRepository } from "../../repositories/implementations/WorkingsUserRepository";

interface IRequest {
  contestnumber: number;
  sitenumber: number;
  workingnumber: number;
  usernumbers: number[];
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
    usernumbers,
  }: IRequest): Promise<void> {
    try {
      await this.workingsUserRepository.addUsersToWorking({
        contestnumber,
        sitenumber,
        workingnumber,
        usernumbers,
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { AddUsersToWorkingUseCase };
