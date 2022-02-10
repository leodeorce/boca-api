import { getRepository, Repository } from "typeorm";

import { Problem } from "../../entities/Problem";
import {
  ICountResult,
  ICreateProblemDTO,
  IProblemsRepository,
  IUpdateProblemDTO,
} from "../IProblemsRepository";

class ProblemsRepository implements IProblemsRepository {
  private repository: Repository<Problem>;

  constructor() {
    this.repository = getRepository(Problem);
  }

  async list(contestnumber?: number): Promise<Problem[]> {
    if (contestnumber) {
      const problems = await this.repository.query(
        `SELECT * FROM problemtable WHERE contestnumber=${contestnumber}`
      );
      return problems;
    }
    const contests = await this.repository.query(`SELECT * FROM problemtable`);
    return contests;
  }

  async findByName(name: string): Promise<Problem | undefined> {
    const query = `
    SELECT * FROM problemtable WHERE problemname = '${name}'
  `;
    const contest: Problem[] = await this.repository.query(query);
    if (contest.length === 0) {
      return undefined;
    }
    return contest[0];
  }

  async count(): Promise<number> {
    const count: ICountResult[] = await this.repository.query(
      `SELECT MAX(contestnumber) FROM problemtable`
    );
    if (count[0].max === null) {
      return -1;
    }
    return count[0].max;
  }

  async getById(id: number): Promise<Problem | undefined> {
    const contest: Problem[] = await this.repository.query(
      `SELECT * FROM problemtable WHERE problemnumber = ${id}`
    );
    if (contest.length === 0) {
      return undefined;
    }
    return contest[0];
  }

  async create(createObject: ICreateProblemDTO): Promise<void> {
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

    const query = `INSERT INTO problemtable 
      (
        ${createColumns}
       ) VALUES (
         ${createValues}
      );
      `;
    await this.repository.query(query);
    return Promise.resolve();
  }

  async update(updateObject: IUpdateProblemDTO): Promise<Problem> {
    // Remover parâmetros vazios (string vazia ou nulos, etc)
    const filteredObject = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateObject).filter(([_, v]) => v != null)
    );

    let query = `UPDATE problemtable\n`;
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
      `\nWHERE problemnumber = ${updateObject.problemnumber};`
    );

    const updatedContest: Problem[] = await this.repository.query(query);

    return updatedContest[0];
  }

  async delete(problemnumber: number): Promise<void> {
    const query = `DELETE FROM problemtable WHERE problemnumber=${problemnumber}`;
    await this.repository.query(query);
  }
}

export { ProblemsRepository };
