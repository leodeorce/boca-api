import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { User } from "../../entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
  IUpdateUserDTO,
  ILastIdResult,
} from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async list(contestnumber?: number): Promise<User[]> {
    if (contestnumber) {
      const problems = await this.repository.query(
        `SELECT * FROM usertable WHERE contestnumber=${contestnumber}`
      );
      return problems;
    }
    const users = await this.repository.query(`SELECT * FROM usertable`);
    return users;
  }

  async findByName(name: string): Promise<User | undefined> {
    const query = `
      SELECT * FROM usertable WHERE username = '${name}'
    `;
    const user: User[] = await this.repository.query(query);
    if (user.length === 0) {
      return undefined;
    }
    return user[0];
  }

  async getLastId(
    contestnumber: number,
    usersitenumber: number
  ): Promise<number | undefined> {
    const lastIdResult: ILastIdResult | undefined = await this.repository
      .createQueryBuilder("user")
      .select("MAX(user.usernumber)", "id")
      .where("user.contestnumber = :contestnumber", {
        contestnumber: contestnumber,
      })
      .andWhere("user.usersitenumber = :usersitenumber", {
        usersitenumber: usersitenumber,
      })
      .getRawOne();

    return lastIdResult !== undefined ? lastIdResult.id : undefined;
  }

  async getById(
    contestnumber: number,
    usersitenumber: number,
    usernumber: number
  ): Promise<User | undefined> {
    const user: User | null = await this.repository.findOneBy({
      contestnumber: contestnumber,
      usersitenumber: usersitenumber,
      usernumber: usernumber,
    });
    return user != null ? user : undefined;
  }

  async create(createObject: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(createObject);
    await this.repository.save(user);
    return user;
  }

  async update(updateObject: IUpdateUserDTO): Promise<User> {
    // Remover parâmetros vazios (string vazia ou nulos, etc)
    const filteredObject = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateObject).filter(([_, v]) => v != null)
    );

    let query = `UPDATE usertable\n`;
    const KeysAndValues = Object.entries(filteredObject);
    if (KeysAndValues.length > 0) {
      query = query.concat(`
      SET `);
    }

    KeysAndValues.forEach((object) => {
      const value =
        typeof object[1] === "string" ? `'${object[1]}'` : object[1];
      query = query.concat(`${object[0]} = ${value}, `);
    });
    query = query.trim(); // Remove espaços em branco desnecessarios
    query = query.slice(0, query.length - 1); // Retira a ultima virgula
    query = query.concat(`
      \nWHERE usernumber = ${updateObject.usernumber};`);
    try {
      const updatedUser: User[] = await this.repository.query(query);
      return updatedUser[0];
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async delete(userNumber: number): Promise<void> {
    const query = `DELETE FROM usertable WHERE usernumber=${userNumber}`;
    try {
      await this.repository.query(query);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { UsersRepository };
