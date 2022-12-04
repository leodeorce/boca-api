import { Repository } from "typeorm";
import { AppDataSource } from "../../database";

import { Lang } from "../../entities/Lang";
import {
  ILangRepository,
  ICreateLangDTO,
  IUpdadeLangDTO,
  ILastIdResult,
} from "../ILangRepository";

class LangRepository implements ILangRepository {
  private repository: Repository<Lang>;

  constructor() {
    this.repository = AppDataSource.getRepository(Lang);
  }

  // TODO Verificar se o BOCA permite duas linguagens de mesmo nome embora o banco permita
  async findByName(
    langname: string,
    contestNumber: number
  ): Promise<Lang | undefined> {
    const lang: Lang[] = await this.repository.query(
      `SELECT * FROM langtable WHERE langname = '${langname} AND contestnumber=${contestNumber}'`
    );
    if (lang.length === 0) {
      return undefined;
    }
    return lang[0];
  }

  async getById(
    contestnumber: number,
    langnumber: number
  ): Promise<Lang | undefined> {
    const lang: Lang | null = await this.repository.findOneBy({
      contestnumber: contestnumber,
      langnumber: langnumber,
    });

    return lang != null ? lang : undefined;
  }

  async getLastId(contestnumber: number): Promise<number | undefined> {
    const lastIdResult: ILastIdResult | undefined = await this.repository
      .createQueryBuilder("lang")
      .select("MAX(lang.langnumber)", "id")
      .where("lang.contestnumber = :contestnumber", {
        contestnumber: contestnumber,
      })
      .getRawOne();

    return lastIdResult !== undefined ? lastIdResult.id : undefined;
  }

  async list(contestnumber: number): Promise<Lang[]> {
    return await this.repository.find({
      where: { contestnumber: contestnumber },
    });
  }

  async create(createObject: ICreateLangDTO): Promise<Lang> {
    const lang = this.repository.create(createObject);
    await this.repository.save(lang);
    return lang;
  }

  async update(updateObject: IUpdadeLangDTO): Promise<Lang> {
    const result = await this.repository
      .createQueryBuilder()
      .update(Lang)
      .set(updateObject)
      .where("contestnumber = :contestnumber", {
        contestnumber: updateObject.contestnumber,
      })
      .andWhere("langnumber = :langnumber", {
        langnumber: updateObject.langnumber,
      })
      .returning("*")
      .execute();

    const updatedLang: Record<string, unknown> = result.raw[0];
    return this.repository.create(updatedLang);
  }

  async delete(contestnumber: number, langnumber: number): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Lang)
      .where("contestnumber = :contestnumber", { contestnumber: contestnumber })
      .andWhere("langnumber = :langnumber", { langnumber: langnumber })
      .execute();
  }
}

export { LangRepository };
