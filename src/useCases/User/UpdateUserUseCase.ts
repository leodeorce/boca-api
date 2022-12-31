import { container, inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";
import SiteValidator from "../../shared/validation/entities/SiteValidator";
import UserValidator from "../../shared/validation/entities/UserValidator";

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
class UpdateUserUseCase {
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

export { UpdateUserUseCase };
