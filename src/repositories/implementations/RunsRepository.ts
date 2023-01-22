import { Repository } from "typeorm";

import { AppDataSource } from "../../database";

import { Run } from "../../entities/Run";

import {
  ICreateRunDTO,
  ILastIdResult,
  IRunsRepository,
  IUpdateRunDTO,
} from "../IRunsRepository";

class RunsRepository implements IRunsRepository {
  private repository: Repository<Run>;

  constructor() {
    this.repository = AppDataSource.getRepository(Run);
  }

  async list(contestnumber: number, runproblem: number): Promise<Run[]> {
    return await this.repository.find({
      where: { contestnumber: contestnumber, runproblem: runproblem },
    });
  }

  async getLastId(
    contestnumber: number,
    runproblem: number
  ): Promise<number | undefined> {
    const lastIdResult: ILastIdResult | undefined = await this.repository
      .createQueryBuilder("run")
      .select("MAX(run.runnumber)", "id")
      .where("run.contestnumber = :contestnumber", {
        contestnumber: contestnumber,
      })
      .andWhere("run.runproblem = :runproblem", {
        runproblem: runproblem,
      })
      .getRawOne();

    return lastIdResult !== undefined ? lastIdResult.id : undefined;
  }

  async getById(
    contestnumber: number,
    runproblem: number,
    runnumber: number
  ): Promise<Run | undefined> {
    const run: Run | null = await this.repository.findOneBy({
      contestnumber: contestnumber,
      runproblem: runproblem,
      runnumber: runnumber,
    });

    return run != null ? run : undefined;
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

  async create(createObject: ICreateRunDTO): Promise<Run> {
    const run = this.repository.create(createObject);
    await this.repository.save(run);
    return run;
  }

  async update(updateObject: IUpdateRunDTO): Promise<Run> {
    const result = await this.repository
      .createQueryBuilder()
      .update(Run)
      .set(updateObject)
      .where("contestnumber = :contestnumber", {
        contestnumber: updateObject.contestnumber,
      })
      .andWhere("runproblem = :runproblem", {
        runproblem: updateObject.runproblem,
      })
      .andWhere("runnumber = :runnumber", {
        runnumber: updateObject.runnumber,
      })
      .returning("*")
      .execute();

    const updatedRun: Record<string, unknown> = result.raw[0];
    return this.repository.create(updatedRun);
  }

  async delete(
    contestnumber: number,
    runproblem: number,
    runnumber: number
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Run)
      .where("contestnumber = :contestnumber", { contestnumber: contestnumber })
      .andWhere("runproblem = :runproblem", {
        runproblem: runproblem,
      })
      .andWhere("runnumber = :runnumber", {
        runnumber: runnumber,
      })
      .execute();
  }
}

export { RunsRepository };
