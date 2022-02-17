/* eslint-disable no-restricted-syntax */
import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { UserWorking } from "../../entities/UserWorking";
import { Working } from "../../entities/Working";
import {
  ICreateWorkingUsers,
  ICreateUserWorkings,
  IWorkingsUserRepository,
  IDeleteUserFromWorkings,
  IDeleteWorkingFromUsers,
} from "../IWorkingsUserRepository";

class WorkingsUserRepository implements IWorkingsUserRepository {
  private repository: Repository<UserWorking>;

  constructor() {
    this.repository = getRepository(UserWorking);
  }

  async addUsersToWorking(createObject: ICreateWorkingUsers): Promise<void> {
    for await (const user of createObject.usernumbers) {
      const query = `INSERT INTO userworkingtable 
      (
        sitenumber, contestnumber, usernumber, workingnumber
        ) VALUES (
          ${createObject.sitenumber}, ${createObject.contestnumber}, ${user}, ${createObject.workingnumber}
          );`;

      try {
        await this.repository.query(query);
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
        await this.repository.query(query);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve();
  }

  async getWorkingsByUsers(usernumber: number): Promise<Working[] | undefined> {
    const query = `SELECT workingtable.workingnumber, usernumber, name, start_date, end_date, last_answer_date, max_file_size, created_at, updated_at, is_multilogin, deleted_at
    FROM userworkingtable 
    LEFT JOIN workingtable 
    ON userworkingtable.workingnumber = workingtable.workingnumber 
    WHERE usernumber = ${usernumber}`;

    try {
      const workings = await this.repository.query(query);
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
      const workings = await this.repository.query(query);
      return workings;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteUserFromWorkings(
    deleteObject: IDeleteUserFromWorkings
  ): Promise<void> {
    for await (const working of deleteObject.workingnumbers) {
      const query = `DELETE FROM userworkingtable 
        WHERE sitenumber = ${deleteObject.sitenumber} AND
        contestnumber = ${deleteObject.contestnumber} AND
        usernumber = ${deleteObject.usernumber} AND
        workingnumber = ${working};`;

      try {
        await this.repository.query(query);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve();
  }

  async deleteWorkingFromUsers(
    deleteObject: IDeleteWorkingFromUsers
  ): Promise<void> {
    for await (const user of deleteObject.usernumbers) {
      const query = `DELETE FROM userworkingtable 
        WHERE sitenumber = ${deleteObject.sitenumber} AND
        contestnumber = ${deleteObject.contestnumber} AND
        usernumber = ${user} AND
        workingnumber = ${deleteObject.workingnumber};`;

      try {
        await this.repository.query(query);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve();
  }
}

export { WorkingsUserRepository };
