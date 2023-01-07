import { container, inject, injectable } from "tsyringe";

import { User } from "../../entities/User";

import { IUsersRepository } from "../../repositories/IUsersRepository";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import SiteValidator from "../../shared/validation/entities/SiteValidator";

interface IRequest {
  contestnumber: number;
  usersitenumber: number;
}

@injectable()
class ListUsersUseCase {
  private contestValidator: ContestValidator;
  private siteValidator: SiteValidator;

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.siteValidator = container.resolve(SiteValidator);
  }

  async execute({ contestnumber, usersitenumber }: IRequest): Promise<User[]> {
    await this.contestValidator.exists(contestnumber);
    await this.siteValidator.exists(contestnumber, usersitenumber);
    return await this.usersRepository.list(contestnumber, usersitenumber);
  }
}

export { ListUsersUseCase };
