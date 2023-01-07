import { Repository } from "typeorm";

import { AppDataSource } from "../../database";
import { Problem } from "../../entities/Problem";
import {
  ICountResult,
  ICreateProblemDTO,
  IProblemsRepository,
  IUpdateProblemDTO,
} from "../IProblemsRepository";

class ProblemsRepository implements IProblemsRepository {
  private repository: Repository<Problem>;

  constructor() {
    this.repository = AppDataSource.getRepository(Problem);
  }

  async list(contestnumber?: number): Promise<Problem[]> {
    if (contestnumber !== undefined) {
      const problems = await this.repository.query(
        `SELECT * FROM problemtable WHERE contestnumber=${contestnumber}`
      );
      return problems;
    }
    const contests = await this.repository.query(`SELECT * FROM problemtable`);
    return contests;
  }

  async findByName(name: string): Promise<Problem | undefined> {
    const query = `
      SELECT * FROM problemtable WHERE problemname = '${name}'
    `;
    const contest: Problem[] = await this.repository.query(query);
    if (contest.length === 0) {
      return undefined;
    }
    return contest[0];
  }

  async count(): Promise<number> {
    const count: ICountResult[] = await this.repository.query(
      `SELECT MAX(problemnumber) FROM problemtable`
    );
    if (count[0].max === null) {
      return -1;
    }
    return count[0].max;
  }

  async getById(
    contestnumber: number,
    problemnumber: number
  ): Promise<Problem | undefined> {
    const problem: Problem | null = await this.repository.findOneBy({
      contestnumber: contestnumber,
      problemnumber: problemnumber,
    });

    return problem != null ? problem : undefined;
  }

  async getFileByOid(oid: number): Promise<Buffer | undefined> {
    const result = await this.repository.query(
      `SELECT pg_catalog.lo_get(${oid});`
    );

    if (result.length === 0 || result[0].lo_get == null) {
      return undefined;
    }
    return result[0].lo_get as Buffer;
  }

  async create(createObject: ICreateProblemDTO): Promise<Problem> {
    const problem = this.repository.create(createObject);
    await this.repository.save(problem);
    return problem;
  }

  async createBlob(file: Buffer): Promise<number> {
    const createLoResult = await this.repository.query(
      "SELECT pg_catalog.lo_create('0');"
    );
    const oid = createLoResult[0].lo_create;

    let query = `SELECT pg_catalog.lo_open('${oid}', 131072);`;

    const fileHex = file.toString("hex");
    const CHUNK_SIZE = 32768;
    const numWrites = Math.floor(fileHex.length / CHUNK_SIZE) + 1;

    for (let i = 0; i < numWrites; i += 1) {
      query = query.concat(
        "\n",
        `SELECT pg_catalog.lowrite(0, '\\x${fileHex.slice(
          CHUNK_SIZE * i,
          CHUNK_SIZE * (i + 1)
        )}');`
      );
    }

    query = query.concat("\n", "SELECT pg_catalog.lo_close(0);");
    await this.repository.query(query);

    return oid;
  }

  async deleteBlob(oid: number): Promise<void> {
    await this.repository.query(`SELECT pg_catalog.lo_unlink(${oid});`);
  }

  async update(updateObject: IUpdateProblemDTO): Promise<Problem> {
    const result = await this.repository
      .createQueryBuilder()
      .update(Problem)
      .set(updateObject)
      .where("contestnumber = :contestnumber", {
        contestnumber: updateObject.contestnumber,
      })
      .andWhere("problemnumber = :problemnumber", {
        problemnumber: updateObject.problemnumber,
      })
      .returning("*")
      .execute();

    const updatedProblem: Record<string, unknown> = result.raw[0];
    return this.repository.create(updatedProblem);
  }

  async delete(contestnumber: number, problemnumber: number): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Problem)
      .where("contestnumber = :contestnumber", { contestnumber: contestnumber })
      .andWhere("problemnumber = :problemnumber", {
        problemnumber: problemnumber,
      })
      .execute();
  }
}

export { ProblemsRepository };
