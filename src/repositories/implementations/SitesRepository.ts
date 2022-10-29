import { Repository } from "typeorm";
import { AppDataSource } from "../../database";

import { Site } from "../../entities/Site";
import {
  ILastIdResult,
  ICreateSiteDTO,
  ISitesRepository,
  IUpdateSiteDTO,
} from "../ISitesRepository";

class SitesRepository implements ISitesRepository {
  private repository: Repository<Site>;

  constructor() {
    this.repository = AppDataSource.getRepository(Site);
  }

  async list(contestnumber?: number): Promise<Site[]> {
    if (contestnumber !== undefined) {
      const problems = await this.repository.query(
        `SELECT * FROM sitetable WHERE contestnumber=${contestnumber}`
      );

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

  async getLastId(contestnumber: number): Promise<number | undefined> {
    const lastIdResult: ILastIdResult | undefined = await this.repository
      .createQueryBuilder("site")
      .select("MAX(site.sitenumber)", "id")
      .where("site.contestnumber = :contestnumber", {
        contestnumber: contestnumber,
      })
      .getRawOne();

    if (lastIdResult === undefined) {
      return undefined;
    }

    return lastIdResult.id;
  }

  async getById(id: number, contestnumber: number): Promise<Site | undefined> {
    const site: Site | null = await this.repository.findOneBy({
      sitenumber: id,
      contestnumber: contestnumber,
    });
    if (site === null) {
      return undefined;
    }
    return site;
  }

  async create(createObject: ICreateSiteDTO): Promise<Site> {
    const site = this.repository.create(createObject);
    await this.repository.save(site);
    return site;
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
