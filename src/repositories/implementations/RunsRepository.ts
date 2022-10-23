import { getRepository, Repository } from "typeorm";

import { Run } from "../../entities/Run";
import {
  ICountResult,
  ICreateRunDTO,
  IRunsRepository,
  IUpdateRunDTO,
} from "../IRunsRepository";

class RunsRepository implements IRunsRepository {
  private repository: Repository<Run>;

  constructor() {
    this.repository = getRepository(Run);
  }

  async list(contestnumber?: number): Promise<Run[]> {
    if (contestnumber) {
      const problems = await this.repository.query(
        `SELECT * FROM runtable WHERE runproblem=${contestnumber}`
      );
      return problems;
    }
    const runs = await this.repository.query(`SELECT * FROM runtable`);
    return runs;
  }

  async count(): Promise<number> {
    const count: ICountResult[] = await this.repository.query(
      `SELECT MAX(runnumber) FROM runtable`
    );
    if (count[0].max === null) {
      return -1;
    }
    return parseInt(count[0].max, 10);
  }

  async getById(id: number): Promise<Run | undefined> {
    const contest: Run[] = await this.repository.query(
      `SELECT * FROM runtable WHERE runnumber = ${id}`
    );
    if (contest.length === 0) {
      return undefined;
    }
    return contest[0];
  }

  async create(createObject: ICreateRunDTO): Promise<void> {
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

    const query = `INSERT INTO runtable 
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

  async update(updateObject: IUpdateRunDTO): Promise<Run> {
    // Remover parâmetros vazios (string vazia ou nulos, etc)
    const filteredObject = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateObject).filter(([_, v]) => v != null)
    );

    let query = `UPDATE runtable\n`;
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
    query = query.concat(`\nWHERE runnumber = ${updateObject.runnumber};`);
    try {
      const updatedContest: Run[] = await this.repository.query(query);
      return updatedContest[0];
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async delete(runNumber: number): Promise<void> {
    const query = `DELETE FROM runtable WHERE runNumber=${runNumber}`;
    try {
      await this.repository.query(query);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { RunsRepository };
