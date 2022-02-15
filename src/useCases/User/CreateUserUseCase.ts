import { inject, injectable } from "tsyringe";

import { RunsRepository } from "../../repositories/implementations/RunsRepository";

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
class CreateRunUseCase {
  constructor(
    @inject("RunsRepository")
    private usersRepository: RunsRepository
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
    await this.usersRepository.create({
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
  }
}

export { CreateRunUseCase };
