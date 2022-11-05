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

  async list(contestnumber: number): Promise<Site[]> {
    return await this.repository.find({
      where: { contestnumber: contestnumber },
    });
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

  async getById(
    contestnumber: number,
    sitenumber: number
  ): Promise<Site | undefined> {
    const site: Site | null = await this.repository.findOneBy({
      contestnumber: contestnumber,
      sitenumber: sitenumber,
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
    const result = await this.repository
      .createQueryBuilder()
      .update(Site)
      .set(updateObject)
      .where("contestnumber = :contestnumber", {
        contestnumber: updateObject.contestnumber,
      })
      .andWhere("sitenumber = :sitenumber", {
        sitenumber: updateObject.sitenumber,
      })
      .returning("*")
      .execute();

    const updatedSite: Record<string, unknown> = result.raw[0];
    return this.repository.create(updatedSite);
  }

  async delete(sitenumber: number, contestnumber: number): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Site)
      .where("contestnumber = :contestnumber", { contestnumber: contestnumber })
      .andWhere("sitenumber = :sitenumber", { sitenumber: sitenumber })
      .execute();
  }
}

export { SitesRepository };
