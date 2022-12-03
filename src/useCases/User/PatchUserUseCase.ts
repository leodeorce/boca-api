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
  username?: string;
  userfullname?: string;
  userdesc?: string;
  usertype: string;
  userenabled?: boolean;
  usermultilogin?: boolean;
  userpassword?: string;
  userip?: string;
  userlastlogin?: number;
  usersession?: string;
  usersessionextra?: string;
  userlastlogout?: number;
  userpermitip?: string;
  userinfo?: string;
  usericpcid?: string;
}

@injectable()
class PatchUserUseCase {
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
    const existingUser = await this.userValidator.exists(
      contestnumber,
      usersitenumber,
      usernumber
    );

    const user = new User();

    user.contestnumber = contestnumber
      ? contestnumber
      : existingUser.contestnumber;

    user.usernumber = usernumber ? usernumber : existingUser.usernumber;

    user.usersitenumber = usersitenumber
      ? usersitenumber
      : existingUser.usersitenumber;

    user.username = username ? username : existingUser.username;
    user.userfullname = userfullname ? userfullname : existingUser.userfullname;

    user.userdesc = userdesc
      ? userdesc
      : existingUser.userdesc != null
      ? existingUser.userdesc
      : undefined;

    user.usertype = usertype ? usertype : existingUser.usertype;
    user.userenabled = userenabled ? userenabled : existingUser.userenabled;

    user.usermultilogin = usermultilogin
      ? usermultilogin
      : existingUser.usermultilogin;

    user.userpassword = userpassword ? userpassword : existingUser.userpassword;

    user.userip = userip
      ? userip
      : existingUser.userip != null
      ? existingUser.userip
      : undefined;

    user.userlastlogin = userlastlogin
      ? userlastlogin
      : existingUser.userlastlogin != null
      ? existingUser.userlastlogin
      : undefined;

    user.usersession = usersession ? usersession : existingUser.usersession;

    user.usersessionextra = usersessionextra
      ? usersessionextra
      : existingUser.usersessionextra;

    user.userlastlogout = userlastlogout
      ? userlastlogout
      : existingUser.userlastlogout != null
      ? existingUser.userlastlogout
      : undefined;

    user.userpermitip = userpermitip
      ? userpermitip
      : existingUser.userpermitip != null
      ? existingUser.userpermitip
      : undefined;

    user.userinfo = userinfo ? userinfo : existingUser.userinfo;
    user.usericpcid = usericpcid ? usericpcid : existingUser.usericpcid;

    await this.userValidator.isValid(user);

    return await this.usersRepository.update({ ...user });
  }
}

export { PatchUserUseCase };
