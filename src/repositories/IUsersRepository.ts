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
  userpermitip?: number;
  userinfo: string;
  updatetime: number;
  usercpcid: string;
}

interface IUpdateUserDTO {
  contestnumber?: number;
  usersitenumber?: number;
  usernumber: number;
  username?: string;
  userfullname?: string;
  userdesc?: string;
  usertype?: string;
  userenabled?: boolean;
  usermultilogin?: boolean;
  userpassword?: string;
  userip?: string;
  userlastlogin?: number;
  usersession?: string;
  usersessionextra?: string;
  userlastlogout?: number;
  userpermitip?: number;
  userinfo?: string;
  updatetime?: number;
  usercpcid?: string;
}

interface ICountResult {
  max: string;
}

interface IUsersRepository {
  findByName(name: string): Promise<User | undefined>;
  list(): Promise<User[]>;
  create(user: ICreateUserDTO): Promise<void>;
  count(): Promise<number>;
  getById(id: number): Promise<User | undefined>;
  update(user: IUpdateUserDTO): Promise<User>;
  delete(contestnumber: number): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO, ICountResult, IUpdateUserDTO };
