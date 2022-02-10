import { getRepository, Repository, QueryFailedError } from "typeorm";

import { Lang } from "../../entities/Lang";
import {
  ILangRepository,
  ICreateLangDTO,
  ICountResult,
} from "../ILangRepository";

class LangRepository implements ILangRepository {
  async findByName(
    langname: string,
    contestnumber: number
  ): Promise<Lang | undefined> {
    const lang: Lang[] = await this.repository.query(
      `SELECT * FROM langtable WHERE langname = '${langname}' and contestnumber = ${contestnumber}`
    );
    if (lang.length === 0) {
      return undefined;
    }
    return lang[0];
  }
  private repository: Repository<Lang>;

  constructor() {
    this.repository = getRepository(Lang);
  }
  async count(): Promise<number> {
    const count: ICountResult[] = await this.repository.query(
      `SELECT MAX(langnumber) FROM langtable`
    );
    if (count[0].max === null) {
      return -1;
    }
    return count[0].max;
  }

  async list(problemNumber: number): Promise<Lang[]> {
    const lang: Lang[] = await this.repository.query(
      `SELECT * FROM langtable WHERE problemnumber = ${problemNumber}`
    );
    return lang;
  }

  async create(createObject: ICreateLangDTO): Promise<void> {
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

    const query = `INSERT INTO langtable 
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

  async delete(langnumber: number, contestnumber: number): Promise<void> {
    const query = `DELETE FROM langtable WHERE contestnumber=${contestnumber} and langnumber=${langnumber}`;
    await this.repository.query(query);
  }
}

export { LangRepository };
