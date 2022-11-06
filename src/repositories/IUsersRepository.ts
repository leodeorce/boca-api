import { User } from "../entities/User";

interface ICreateUserDTO {
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

interface IUpdateUserDTO {
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

interface ILastIdResult {
  id: number;
}

interface IUsersRepository {
  findByName(name: string): Promise<User | undefined>;
  list(contestnumber: number, usersitenumber: number): Promise<User[]>;
  create(user: ICreateUserDTO): Promise<User>;
  getLastId(
    contestnumber: number,
    usersitenumber: number
  ): Promise<number | undefined>;
  getById(
    contestnumber: number,
    usersitenumber: number,
    usernumber: number
  ): Promise<User | undefined>;
  update(user: IUpdateUserDTO): Promise<User>;
  delete(
    contestnumber: number,
    usersitenumber: number,
    usernumber: number
  ): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO, ILastIdResult, IUpdateUserDTO };
