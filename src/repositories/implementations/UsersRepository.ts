import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import {
  ICountResult,
  ICreateUserDTO,
  IUsersRepository,
  IUpdateUserDTO,
} from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
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

  async count(): Promise<number> {
    const count: ICountResult[] = await this.repository.query(
      `SELECT MAX(usernumber) FROM usertable`
    );
    if (count[0].max === null) {
      return -1;
    }
    return parseInt(count[0].max, 10);
  }

  async getById(id: number): Promise<User | undefined> {
    const user: User[] = await this.repository.query(
      `SELECT * FROM usertable WHERE usernumber = ${id}`
    );
    if (user.length === 0) {
      return undefined;
    }
    return user[0];
  }

  async create(createObject: ICreateUserDTO): Promise<void> {
    let createColumns = "";
    let createValues = "";

    const filteredObject = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(createObject).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, v]) => v !== null && v !== undefined
      )
    );

    const KeysAndValues = Object.entries(filteredObject);
    if (KeysAndValues.length === 0) {
      return Promise.reject();
    }

    KeysAndValues.forEach((object) => {
      createColumns = createColumns.concat(`${object[0]},`);
      const value =
        typeof object[1] === "string" ? `'${object[1]}',` : `${object[1]},`;
      createValues = createValues.concat(value);
    });
    // Limpar a query
    createColumns = createColumns.trim(); // Remove espaços em branco desnecessarios
    createColumns = createColumns.slice(0, createColumns.length - 1); // Retira a ultima virgula
    createValues = createValues.trim(); // Remove espaços em branco desnecessarios
    createValues = createValues.slice(0, createValues.length - 1); // Retira a ultima virgula

    const query = `INSERT INTO usertable 
      (
        ${createColumns}
       ) VALUES (
         ${createValues}
      );
      `;

    try {
      await this.repository.query(query);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
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
      updatetime = extract(epoch from now())
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
