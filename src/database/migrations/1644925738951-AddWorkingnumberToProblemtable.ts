import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkingnumberToProblemtable1644925738951
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        ALTER TABLE problemtable ADD working_id INT;
        ALTER TABLE problemtable ADD CONSTRAINT workingnumber_fk FOREIGN KEY (working_id) REFERENCES workingtable (workingnumber);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
      ALTER TABLE problemtable DROP COLUMN working_id
      ;`);
  }
}
