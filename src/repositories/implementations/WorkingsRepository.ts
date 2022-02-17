import { getRepository, Repository } from "typeorm";

import { Working } from "../../entities/Working";
import {
  ICountResult,
  ICreateWorkingDTO,
  IUpdateWorkingDTO,
  IWorkingsRepository,
} from "../IWorkingsRepository";

class WorkingsRepository implements IWorkingsRepository {
  private repository: Repository<Working>;

  constructor() {
    this.repository = getRepository(Working);
  }

  async list(contestNumber?: number): Promise<Working[]> {
    if (contestNumber !== undefined) {
      const workings = await this.repository.query(
        `SELECT * FROM workingtable WHERE contestnumber=${contestNumber}`
      );
      return workings;
    }
    const workings = await this.repository.query(`SELECT * FROM workingtable`);
    return workings;
  }

  async listByUser(userNumber: number): Promise<Working[]> {
    const workings = await this.repository.query(
      `SELECT * FROM workingtable WHERE contestnumber=${userNumber}`
    );
    return workings;
  }

  async findByName(name: string): Promise<Working | undefined> {
    const query = `
    SELECT * FROM workingtable WHERE name = '${name}'
  `;
    const working: Working[] = await this.repository.query(query);
    if (working.length === 0) {
      return undefined;
    }
    return working[0];
  }

  async count(): Promise<number> {
    const count: ICountResult[] = await this.repository.query(
      `SELECT MAX(workingnumber) FROM workingtable`
    );
    if (count[0].max === null) {
      return -1;
    }
    return parseInt(count[0].max, 10);
  }

  async getById(id: number): Promise<Working | undefined> {
    const working: Working[] = await this.repository.query(
      `SELECT * FROM workingtable WHERE workingnumber = ${id}`
    );
    if (working.length === 0) {
      return undefined;
    }
    return working[0];
  }

  async create(createObject: ICreateWorkingDTO): Promise<void> {
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

    const query = `INSERT INTO workingtable 
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

  async update(updateObject: IUpdateWorkingDTO): Promise<Working> {
    // Remover parâmetros vazios (string vazia ou nulos, etc)
    const filteredObject = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateObject).filter(([_, v]) => v != null)
    );

    let query = `UPDATE workingtable\n`;
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
      `\nWHERE workingnumber = ${updateObject.workingnumber};`
    );
    try {
      const updatedWorking: Working[] = await this.repository.query(query);
      return updatedWorking[0];
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async delete(workingNumber: number): Promise<void> {
    const query = `DELETE FROM workingtable WHERE workingnumber=${workingNumber}`;
    try {
      await this.repository.query(query);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { WorkingsRepository };
