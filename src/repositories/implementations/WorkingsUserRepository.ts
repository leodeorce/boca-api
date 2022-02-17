/* eslint-disable no-restricted-syntax */
import { getRepository, QueryFailedError, Repository } from "typeorm";

import { User } from "../../entities/User";
import { UserWorking } from "../../entities/UserWorking";
import { Working } from "../../entities/Working";
import {
  ICreateWorkingUsers,
  ICreateUserWorkings,
  IWorkingsUserRepository,
} from "../IWorkingsUserRepository";

class WorkingsUserRepository implements IWorkingsUserRepository {
  private workingRepository: Repository<Working>;
  private userRepository: Repository<User>;
  private workingsUserRepository: Repository<UserWorking>;

  constructor() {
    this.workingRepository = getRepository(Working);
    this.userRepository = getRepository(User);
    this.workingsUserRepository = getRepository(UserWorking);
  }

  async addUsersToWorking(createObject: ICreateWorkingUsers): Promise<void> {
    for await (const user of createObject.users) {
      const query = `INSERT INTO userworkingtable 
      (
        sitenumber, contestnumber, usernumber, workingnumber
      ) VALUES (
        ${createObject.sitenumber}, ${createObject.contestnumber}, ${user}, ${createObject.workingnumber}
      );`;

      try {
        await this.workingsUserRepository.query(query);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve();
  }

  async addWorkingToUsers(createObject: ICreateUserWorkings): Promise<void> {
    for await (const working of createObject.workingnumbers) {
      const query = `INSERT INTO userworkingtable 
      (
        sitenumber, contestnumber, usernumber, workingnumber
      ) VALUES (
        ${createObject.sitenumber}, ${createObject.contestnumber}, ${createObject.usernumber}, ${working}
      );`;

      try {
        console.log(query);
        await this.workingsUserRepository.query(query);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve();
  }

  async getWorkingsByUsers(usernumber: number): Promise<Working[] | undefined> {
    const query = `SELECT usernumber, name, start_date, end_date, last_answer_date, max_file_size, created_at, updated_at, is_multilogin, deleted_at
    FROM userworkingtable 
    LEFT JOIN workingtable 
    ON userworkingtable.workingnumber = workingtable.workingnumber 
    WHERE usernumber = ${usernumber}`;

    try {
      const workings = await this.workingsUserRepository.query(query);
      return workings;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getUsersByWorkings(workingnumber: number): Promise<User[] | undefined> {
    const query = `SELECT usersitenumber, usertable.contestnumber, usertable.usernumber, username, userfullname, userdesc,
    usertype, userenabled, usermultilogin, userpassword, userip, userlastlogin, usersession, usersessionextra,
    userlastlogout, userpermitip, userinfo, usericpcid, updatetime
    FROM userworkingtable 
    LEFT JOIN usertable 
    ON userworkingtable.usernumber = usertable.usernumber 
    WHERE workingnumber = ${workingnumber}`;

    try {
      const workings = await this.workingsUserRepository.query(query);
      return workings;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  deleteUserFromWorking(
    workingNumber: number,
    userNumber: number
  ): Promise<void> {
    return Promise.resolve();
  }

  deleteWorkingFromUser(
    workingNumber: number,
    userNumber: number
  ): Promise<void> {
    return Promise.resolve();
  }
}

export { WorkingsUserRepository };
