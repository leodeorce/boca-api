import { container, inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { ApiError } from "../../errors/ApiError";

import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import ContestValidator from "../../shared/validation/ContestValidator";
import SiteValidator from "../../shared/validation/SiteValidator";
import UserValidator from "../../shared/validation/UserValidator";

interface IRequest {
  contestnumber: number;
  usersitenumber: number;
  usernumber: number;
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
  userpermitip?: string;
  userinfo: string;
  usericpcid: string;
}

@injectable()
class ReplaceUserUseCase {
  private contestValidator: ContestValidator;
  private siteValidator: SiteValidator;
  private userValidator: UserValidator;

  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.siteValidator = container.resolve(SiteValidator);
    this.userValidator = container.resolve(UserValidator);
  }

  async execute({
    contestnumber,
    usersitenumber,
    usernumber,
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
    usericpcid,
  }: IRequest): Promise<User> {
    await this.contestValidator.exists(contestnumber);
    await this.siteValidator.exists(contestnumber, usersitenumber);
    await this.userValidator.exists(contestnumber, usersitenumber, usernumber);

    if (
      username === undefined ||
      userfullname === undefined ||
      usertype === undefined ||
      userenabled === undefined ||
      usermultilogin === undefined ||
      userpassword === undefined ||
      usersession === undefined ||
      usersessionextra === undefined ||
      userinfo === undefined ||
      usericpcid === undefined
    ) {
      throw ApiError.badRequest("Missing properties");
    }

    const user = new User();
    user.contestnumber = contestnumber;
    user.usernumber = usernumber;
    user.usersitenumber = usersitenumber;
    user.username = username;
    user.userfullname = userfullname;
    user.userdesc = userdesc;
    user.usertype = usertype;
    user.userenabled = userenabled;
    user.usermultilogin = usermultilogin;
    user.userpassword = userpassword;
    user.userip = userip;
    user.userlastlogin = userlastlogin;
    user.usersession = usersession;
    user.usersessionextra = usersessionextra;
    user.userlastlogout = userlastlogout;
    user.userpermitip = userpermitip;
    user.userinfo = userinfo;
    user.usericpcid = usericpcid;

    await this.userValidator.isValid(user);

    return await this.usersRepository.update({ ...user });
  }
}

export { ReplaceUserUseCase };
