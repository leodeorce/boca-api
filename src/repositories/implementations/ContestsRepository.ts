import { AppDataSource } from "../../database/index";
import { Repository } from "typeorm";

import { Contest } from "../../entities/Contest";
import {
  IContestRepository,
  ICreateContestDTO,
  ILastIdResult,
  IUpdateContestDTO,
} from "../IContestsRepository";

class ContestsRepository implements IContestRepository {
  private repository: Repository<Contest>;

  constructor() {
    this.repository = AppDataSource.getRepository(Contest);
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
    const contest: Contest | null = await this.repository.findOneBy({
      contestname: name,
    });
    if (contest === null) {
      return undefined;
    }
    return contest;
  }

  async getLastId(): Promise<number | undefined> {
    const lastId: ILastIdResult | undefined = await this.repository
      .createQueryBuilder("contest")
      .select("MAX(contest.contestnumber)", "max")
      .getRawOne();

    if (lastId === undefined) {
      return undefined;
    }

    return lastId.id;
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
