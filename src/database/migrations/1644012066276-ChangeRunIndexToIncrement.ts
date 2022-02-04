import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRunIndexToIncrement1644012066276
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
    CREATE SEQUENCE run_id_seq OWNED BY runtable.runnumber;

    ALTER TABLE runtable ALTER COLUMN runnumber SET DEFAULT nextval('run_id_seq');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
      ALTER TABLE runtable ALTER COLUMN runnumber SET DEFAULT 0;
    `);
  }
}
