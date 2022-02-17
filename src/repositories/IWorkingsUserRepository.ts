import { User } from "../entities/User";
import { Working } from "../entities/Working";

interface ICreateWorkingUsers {
  sitenumber: number;
  contestnumber: number;
  usernumbers: number[];
  workingnumber: number;
}

interface ICreateUserWorkings {
  sitenumber: number;
  contestnumber: number;
  usernumber: number;
  workingnumbers: number[];
}

interface IDeleteUserFromWorkings {
  sitenumber: number;
  contestnumber: number;
  usernumber: number;
  workingnumbers: number[];
}
interface IDeleteWorkingFromUsers {
  sitenumber: number;
  contestnumber: number;
  usernumbers: number[];
  workingnumber: number;
}

interface IWorkingsUserRepository {
  addUsersToWorking(createObject: ICreateWorkingUsers): Promise<void>;
  addWorkingToUsers(createObject: ICreateUserWorkings): Promise<void>;
  getWorkingsByUsers(usernumber: number): Promise<Working[] | undefined>;
  getUsersByWorkings(workingnumber: number): Promise<User[] | undefined>;
  deleteUserFromWorkings(deleteObject: IDeleteUserFromWorkings): Promise<void>;
  deleteWorkingFromUsers(deleteObject: IDeleteWorkingFromUsers): Promise<void>;
}

export {
  IWorkingsUserRepository,
  ICreateWorkingUsers,
  ICreateUserWorkings,
  IDeleteUserFromWorkings,
  IDeleteWorkingFromUsers,
};
