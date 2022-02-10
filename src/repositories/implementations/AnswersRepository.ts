import { getRepository, Repository } from "typeorm";

import { Answer } from "../../entities/Answer";
import { Contest } from "../../entities/Contest";
import {
  IAnswersRepository,
  ICreateAnswerDTO,
  IUpdateAnswerDTO,
} from "../IAnswersRepository";

class AnswersRepository implements IAnswersRepository {
  private repository: Repository<Contest>;

  constructor() {
    this.repository = getRepository(Contest);
  }
  count(): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async list(contestNumber: number): Promise<Answer[]> {
    const answers: Answer[] = await this.repository.query(
      `SELECT * FROM answertable WHERE contestnumber = ${contestNumber}`
    );
    return answers;
  }

  async getById(id: number): Promise<Answer | undefined> {
    const answer: Answer[] = await this.repository.query(
      `SELECT * FROM answertable WHERE answernumber = ${id}`
    );
    if (answer.length === 0) {
      return undefined;
    }
    return answer[0];
  }

  async create(createObject: ICreateAnswerDTO): Promise<void> {
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

    const query = `INSERT INTO answertable 
      (
        ${createColumns}
       ) VALUES (
         ${createValues}
      );
      `;
    console.log(query);
    await this.repository.query(query);
    return Promise.resolve();
  }

  async update(updateObject: IUpdateAnswerDTO): Promise<Answer> {
    // Remover parâmetros vazios (string vazia ou nulos, etc)
    const filteredObject = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateObject).filter(([_, v]) => v != null)
    );

    let query = `UPDATE answertable\n`;
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
      `\nWHERE answernumber = ${updateObject.contestnumber};`
    );

    const updatedContest: Answer[] = await this.repository.query(query);

    return updatedContest[0];
  }

  async delete(contestnumber: number): Promise<void> {
    const query = `DELETE FROM answertable WHERE answernumber=${contestnumber}`;
    await this.repository.query(query);
  }
}

export { AnswersRepository };
