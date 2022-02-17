/* eslint-disable no-restricted-syntax */
import { getRepository, Repository } from "typeorm";

import { Lang } from "../../entities/Lang";
import { ProblemLanguage } from "../../entities/ProblemLanguage";
import {
  IAddLanguagesToProblem,
  IDeleteLanguagesFromProblem,
  IProblemLanguageRepository,
} from "../IProblemLanguageRepository";

class ProblemLanguageRepository implements IProblemLanguageRepository {
  private repository: Repository<ProblemLanguage>;

  constructor() {
    this.repository = getRepository(ProblemLanguage);
  }

  async addLanguagesToProblem(
    createObject: IAddLanguagesToProblem
  ): Promise<void> {
    for await (const lang of createObject.langnumbers) {
      const query = `INSERT INTO problemlanguagetable 
      (
        contestnumber, problemnumber, langnumber
      ) VALUES (
        ${createObject.contestnumber}, ${createObject.problemnumber}, ${lang}
      );`;

      try {
        await this.repository.query(query);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve();
  }

  async getLanguagesByProblem(
    problemNumber: number
  ): Promise<Lang[] | undefined> {
    const query = `SELECT *
    FROM problemlanguagetable 
    LEFT JOIN langtable 
    ON problemlanguagetable.langnumber = langtable.langnumber
    WHERE problemnumber = ${problemNumber}`;

    try {
      const languages = await this.repository.query(query);
      return languages;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteLanguagesFromProblem(
    deleteObject: IDeleteLanguagesFromProblem
  ): Promise<void> {
    for await (const lang of deleteObject.langnumbers) {
      const query = `DELETE FROM problemlanguagetable 
        WHERE contestnumber = ${deleteObject.contestnumber} AND
        problemnumber = ${deleteObject.problemnumber} AND
        langnumber = ${lang};`;

      try {
        await this.repository.query(query);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve();
  }
}

export { ProblemLanguageRepository };
