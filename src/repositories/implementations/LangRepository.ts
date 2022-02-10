import { getRepository, Repository } from "typeorm";

import { Lang } from "../../entities/Lang";
import { Problem } from "../../entities/Problem";
import { ILangRepository } from "../ILangRepository";

class LangRepository implements ILangRepository {
  private repository: Repository<Lang>;

  constructor() {
    this.repository = getRepository(Lang);
  }
  count(): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async list(problemNumber: number): Promise<Lang[]> {
    const lang: Lang[] = await this.repository.query(
      `SELECT * FROM langtable WHERE contestnumber = ${problemNumber}`
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

    const query = `INSERT INTO answertable 
      (
        ${createColumns}
       ) VALUES (
         ${createValues}
      );
      `;
    await this.repository.query(query);
    return Promise.resolve();
  }

  async delete(contestnumber: number): Promise<void> {
    const query = `DELETE FROM answertable WHERE answernumber=${contestnumber}`;
    await this.repository.query(query);
  }
}

export { LangRepository };
