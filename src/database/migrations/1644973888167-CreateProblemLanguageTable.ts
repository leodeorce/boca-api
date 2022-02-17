import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProblemLanguageTable1644973888167
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        CREATE TABLE problemlanguagetable (
          contestnumber INT NOT NULL,
          problemnumber INT,
          langnumber INT,
          PRIMARY KEY(contestnumber, problemnumber, langnumber),
          FOREIGN KEY (contestnumber, problemnumber) references problemtable(contestnumber, problemnumber),
          FOREIGN KEY (contestnumber, langnumber) references langtable(contestnumber, langnumber)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`DROP TABLE IF EXISTS problemlanguagetable`);
  }
}
