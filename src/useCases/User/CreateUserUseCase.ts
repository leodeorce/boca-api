import { inject, injectable } from "tsyringe";

import { UsersRepository } from "../../repositories/implementations/UsersRepository";

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
  userpermitip?: number;
  userinfo: string;
  updatetime: number;
  usercpcid: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("RunsRepository")
    private usersRepository: UsersRepository
  ) {}

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
    updatetime,
    usercpcid,
  }: IRequest): Promise<void> {
    await this.usersRepository.create({
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
        updatetime,
        usercpcid,
    });
  }
}

export { CreateUserUseCase };
