import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLanguageNumberToProblemtable1645021662603
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
       ALTER TABLE problemtable ADD problemlanguage_id INT;
       ALTER TABLE problemtable ADD CONSTRAINT problemlanguage_fk FOREIGN KEY (problemlanguage_id) REFERENCES problemlanguagetable (id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
    ALTER TABLE problemtable DROP COLUMN problemlanguage_id;
    ;`);
  }
}
