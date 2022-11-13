import { Repository } from "typeorm";
import { AppDataSource } from "../../database";

import { Answer } from "../../entities/Answer";
import {
  IAnswersRepository,
  ICreateAnswerDTO,
  ILastIdResult,
  IUpdateAnswerDTO,
} from "../IAnswersRepository";

class AnswersRepository implements IAnswersRepository {
  private repository: Repository<Answer>;

  constructor() {
    this.repository = AppDataSource.getRepository(Answer);
  }

  async list(contestNumber: number): Promise<Answer[]> {
    const answers: Answer[] = await this.repository.query(
      `SELECT * FROM answertable WHERE contestnumber = ${contestNumber}`
    );
    return answers;
  }

  async getById(
    contestnumber: number,
    answernumber: number
  ): Promise<Answer | undefined> {
    const answer: Answer | null = await this.repository.findOneBy({
      contestnumber: contestnumber,
      answernumber: answernumber,
    });

    return answer != null ? answer : undefined;
  }

  async getLastId(contestnumber: number): Promise<number | undefined> {
    const lastIdResult: ILastIdResult | undefined = await this.repository
      .createQueryBuilder("answer")
      .select("MAX(answer.answernumber)", "id")
      .where("answer.contestnumber = :contestnumber", {
        contestnumber: contestnumber,
      })
      .getRawOne();

    return lastIdResult !== undefined ? lastIdResult.id : undefined;
  }

  async create(createObject: ICreateAnswerDTO): Promise<Answer> {
    const answer = this.repository.create(createObject);
    await this.repository.save(answer);
    return answer;
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
      query = query.concat(`SET `);
    }

    KeysAndValues.forEach((object) => {
      const value =
        typeof object[1] === "string" ? `'${object[1]}'` : object[1];
      query = query.concat(`${object[0]} = ${value}, `);
    });
    query = query.trim(); // Remove espaços em branco desnecessarios
    query = query.slice(0, query.length - 1); // Retira a ultima virgula
    query = query.concat(
      `\nWHERE answernumber = ${updateObject.answernumber} ;`
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
