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

  async list(contestnumber: number): Promise<Answer[]> {
    return await this.repository.find({
      where: { contestnumber: contestnumber },
    });
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
    const result = await this.repository
      .createQueryBuilder()
      .update(Answer)
      .set(updateObject)
      .where("contestnumber = :contestnumber", {
        contestnumber: updateObject.contestnumber,
      })
      .andWhere("answernumber = :answernumber", {
        answernumber: updateObject.answernumber,
      })
      .returning("*")
      .execute();

    const updatedAnswer: Record<string, unknown> = result.raw[0];
    return this.repository.create(updatedAnswer);
  }

  async delete(contestnumber: number, answernumber: number): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Answer)
      .where("contestnumber = :contestnumber", { contestnumber: contestnumber })
      .andWhere("answernumber = :answernumber", { answernumber: answernumber })
      .execute();
  }
}

export { AnswersRepository };
