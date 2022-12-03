import { container, inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";
import SiteValidator from "../../shared/validation/entities/SiteValidator";
import UserValidator from "../../shared/validation/entities/UserValidator";

interface IRequest {
  contestnumber: number;
  usersitenumber: number;
  usernumber: number;
}

@injectable()
class DeleteUserUseCase {
  private contestValidator: ContestValidator;
  private siteValidator: SiteValidator;
  private userValidator: UserValidator;

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.siteValidator = container.resolve(SiteValidator);
    this.userValidator = container.resolve(UserValidator);
  }

  async execute({
    contestnumber,
    usersitenumber,
    usernumber,
  }: IRequest): Promise<void> {
    await this.contestValidator.exists(contestnumber);
    await this.siteValidator.exists(contestnumber, usersitenumber);
    await this.userValidator.exists(contestnumber, usersitenumber, usernumber);
    await this.usersRepository.delete(contestnumber, usersitenumber, usernumber);
  }
}

export { DeleteUserUseCase };
