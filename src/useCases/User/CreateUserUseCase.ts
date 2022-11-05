import { container, inject, injectable } from "tsyringe";
import { ApiError } from "../../errors/ApiError";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";
import ContestValidator from "../../shared/validation/ContestValidator";

interface IRequest {
  contestnumber: number;
  usersitenumber: number;
  username: string;
  userfullname: string;
  userdesc?: string;
  usertype: string;
  userenabled: boolean;
  usermultilogin: boolean;
  userpassword: string;
  userip?: string;
  userlastlogin?: number;
  usersession: string;
  usersessionextra: string;
  userlastlogout?: number;
  userpermitip?: number;
  userinfo: string;
  usercpcid: string;
}

@injectable()
class CreateUserUseCase {
  private contestValidator: ContestValidator;

  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("SitesRepository")
    private sitesRepository: SitesRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
  }

  async execute({
    contestnumber,
    usersitenumber,
    username,
    userfullname,
    userdesc,
    usertype,
    userenabled,
    usermultilogin,
    userpassword,
    userip,
    userlastlogin,
    usersession,
    usersessionextra,
    userlastlogout,
    userpermitip,
    userinfo,
    usercpcid,
  }: IRequest): Promise<void> {
    await this.contestValidator.exists(contestnumber);

    const site = await this.sitesRepository.getById(
      usersitenumber,
      contestnumber
    );
    if (!site) {
      throw ApiError.notFound("Site does not exist");
    }

    const count = (await this.usersRepository.count()) + 1;
    await this.usersRepository.create({
      contestnumber,
      usersitenumber,
      usernumber: count,
      username,
      userfullname,
      userdesc,
      usertype,
      userenabled,
      usermultilogin,
      userpassword,
      userip,
      userlastlogin,
      usersession,
      usersessionextra,
      userlastlogout,
      userpermitip,
      userinfo,
      usercpcid,
    });
  }
}

export { CreateUserUseCase };
