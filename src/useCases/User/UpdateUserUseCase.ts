import { inject, injectable } from "tsyringe";

import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IRequest {
  contestnumber: number;
  usersitenumber: number;
  usernamber: number;
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
  updatetime: number;
  usercpcid: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({
    contestnumber,
    usersitenumber,
    usernamber,
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
    updatetime,
    usercpcid,
  }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.getById(usernumber);

    if (!userExists) {
      throw new Error("User does not exist");
    }
    try {
      await this.usersRepository.update({
        contestnumber,
        usersitenumber,
        usernamber,
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
        updatetime,
        usercpcid,
      });
      return Promise.resolve();
    } catch (err) {
      const error = err as Error;
      return Promise.reject(error);
    }
  }
}

export { UpdateUserUseCase };
