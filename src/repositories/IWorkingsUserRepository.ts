import { User } from "../entities/User";
import { Working } from "../entities/Working";

interface ICreateWorkingUsers {
  sitenumber: number;
  contestnumber: number;
  users: number[];
  workingnumber: number;
}

interface ICreateUserWorkings {
  sitenumber: number;
  contestnumber: number;
  usernumber: number;
  workingnumbers: number[];
}

interface IWorkingsUserRepository {
  addUsersToWorking(createObject: ICreateWorkingUsers): Promise<void>;
  addWorkingToUsers(createObject: ICreateUserWorkings): Promise<void>;
  getWorkingsByUsers(usernumber: number): Promise<Working[] | undefined>;
  getUsersByWorkings(workingnumber: number): Promise<User[] | undefined>;
  deleteUserFromWorking(
    workingNumber: number,
    userNumber: number
  ): Promise<void>;
  deleteWorkingFromUser(
    workingNumber: number,
    userNumber: number
  ): Promise<void>;
}

export { IWorkingsUserRepository, ICreateWorkingUsers, ICreateUserWorkings };
