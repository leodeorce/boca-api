import { getRepository, Repository } from "typeorm";

import { Site } from "../../entities/Site";
import {
  ICountResult,
  ICreateSiteDTO,
  ISitesRepository,
  IUpdateSiteDTO,
} from "../ISitesRepository";

class SitesRepository implements ISitesRepository {
  private repository: Repository<Site>;

  constructor() {
    this.repository = getRepository(Site);
  }

  async list(contestnumber?: number): Promise<Site[]> {
    if (contestnumber !== undefined) {
      const problems = await this.repository.query(
        `SELECT * FROM sitetable WHERE contestnumber=${contestnumber}`
      );
      console.log(contestnumber);
      return problems;
    }
    const sites = await this.repository.query(`SELECT * FROM sitetable`);
    return sites;
  }

  async findByName(name: string): Promise<Site | undefined> {
    const query = `
    SELECT * FROM sitetable WHERE sitename = '${name}'
  `;
    const contest: Site[] = await this.repository.query(query);
    if (contest.length === 0) {
      return undefined;
    }
    return contest[0];
  }

  async count(): Promise<number> {
    const count: ICountResult[] = await this.repository.query(
      `SELECT MAX(sitenumber) FROM sitetable`
    );
    if (count[0].max === null) {
      return -1;
    }
    return parseInt(count[0].max, 10);
  }

  async getById(id: number): Promise<Site | undefined> {
    const contest: Site[] = await this.repository.query(
      `SELECT * FROM sitetable WHERE sitenumber = ${id}`
    );
    if (contest.length === 0) {
      return undefined;
    }
    return contest[0];
  }

  async create(createObject: ICreateSiteDTO): Promise<void> {
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

    const query = `INSERT INTO sitetable 
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

  async update(updateObject: IUpdateSiteDTO): Promise<Site> {
    // Remover parâmetros vazios (string vazia ou nulos, etc)
    const filteredObject = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateObject).filter(([_, v]) => v != null)
    );

    let query = `UPDATE sitetable\n`;
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
    query = query.concat(`\nWHERE sitenumber = ${updateObject.sitenumber};`);
    try {
      const updatedContest: Site[] = await this.repository.query(query);
      return updatedContest[0];
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async delete(siteNumber: number): Promise<void> {
    const query = `DELETE FROM sitetable WHERE sitenumber=${siteNumber}`;
    try {
      await this.repository.query(query);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export { SitesRepository };
