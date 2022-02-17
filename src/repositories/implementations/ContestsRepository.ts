import { getRepository, Repository } from "typeorm";

import { Contest } from "../../entities/Contest";
import {
  IContestRepository,
  ICountResult,
  ICreateContestDTO,
  IUpdateContestDTO,
} from "../IContestsRepository";

class ContestsRepository implements IContestRepository {
  private repository: Repository<Contest>;

  constructor() {
    this.repository = getRepository(Contest);
  }

  async list(): Promise<Contest[]> {
    try {
      const contests = await this.repository.query(
        `SELECT * FROM contesttable`
      );
      return contests;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findByName(name: string): Promise<Contest | undefined> {
    try {
      const query = `
      SELECT * FROM contesttable WHERE contestname = '${name}'
    `;
      const contest: Contest[] = await this.repository.query(query);
      if (contest.length === 0) {
        return undefined;
      }
      return contest[0];
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async count(): Promise<number> {
    try {
      const count: ICountResult[] = await this.repository.query(
        `SELECT MAX(contestnumber) FROM contesttable`
      );
      if (count[0].max === null) {
        return -1;
      }
      return count[0].max;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getById(id: number): Promise<Contest | undefined> {
    try {
      const contest: Contest[] = await this.repository.query(
        `SELECT * FROM contesttable WHERE contestnumber = ${id}`
      );
      if (contest.length === 0) {
        return undefined;
      }
      return contest[0];
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async create(createObject: ICreateContestDTO): Promise<void> {
    let createColumns = "";
    let createValues = "";

    const filteredObject = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(createObject).filter(([_, v]) => v != null)
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

    const query = `INSERT INTO contesttable 
      (
        ${createColumns}
       ) VALUES (
         ${createValues}
      );
      `;
    try {
      await this.repository.query(query);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async update(updateObject: IUpdateContestDTO): Promise<Contest> {
    // Remover parâmetros vazios (string vazia ou nulos, etc)
    const filteredObject = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateObject).filter(([_, v]) => v != null)
    );

    let query = `UPDATE contesttable\n`;
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
    query = query.concat(
      `\nWHERE contestnumber = ${updateObject.contestnumber};`
    );

    try {
      const updatedContest: Contest[] = await this.repository.query(query);
      return updatedContest[0];
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async delete(contestnumber: number): Promise<void> {
    try {
      const query = `DELETE FROM contesttable WHERE contestnumber=${contestnumber}`;
      await this.repository.query(query);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { ContestsRepository };
