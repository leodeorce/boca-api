import { container, injectable } from "tsyringe";

import { User } from "../../entities/User";

import ContestValidator from "../../shared/validation/entities/ContestValidator";
import SiteValidator from "../../shared/validation/entities/SiteValidator";
import UserValidator from "../../shared/validation/entities/UserValidator";

interface IRequest {
  contestnumber: number;
  sitenumber: number;
  usernumber: number;
}

@injectable()
class GetUserUseCase {
  private contestValidator: ContestValidator;
  private siteValidator: SiteValidator;
  private userValidator: UserValidator;

  constructor() {
    this.contestValidator = container.resolve(ContestValidator);
    this.siteValidator = container.resolve(SiteValidator);
    this.userValidator = container.resolve(UserValidator);
  }

  async execute({
    contestnumber,
    sitenumber,
    usernumber,
  }: IRequest): Promise<User> {
    await this.contestValidator.exists(contestnumber);
    await this.siteValidator.exists(contestnumber, sitenumber);
    return await this.userValidator.exists(
      contestnumber,
      sitenumber,
      usernumber
    );
  }
}

export { GetUserUseCase };
