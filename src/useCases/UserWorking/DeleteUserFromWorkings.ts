import { inject, injectable } from "tsyringe";

import { WorkingsUserRepository } from "../../repositories/implementations/WorkingsUserRepository";

interface IRequest {
  contestnumber: number;
  sitenumber: number;
  workingnumbers: number[];
  usernumber: number;
}

@injectable()
class DeleteUserFromWorkingsUseCase {
  constructor(
    @inject("WorkingsUserRepository")
    private workingsUserRepository: WorkingsUserRepository
  ) {}

  async execute({
    contestnumber,
    sitenumber,
    workingnumbers,
    usernumber,
  }: IRequest): Promise<void> {
    try {
      await this.workingsUserRepository.deleteUserFromWorkings({
        contestnumber,
        sitenumber,
        workingnumbers,
        usernumber,
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { DeleteUserFromWorkingsUseCase };
