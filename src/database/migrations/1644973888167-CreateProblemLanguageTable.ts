import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProblemLanguageTable1644973888167
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        CREATE TABLE problemlanguagetable (
          id SERIAL,
          id_contest INT NOT NULL,
          id_problem INT,
          id_language INT,
          PRIMARY KEY(id),
          FOREIGN KEY (id_contest, id_problem) references problemtable(contestnumber, problemnumber),
          FOREIGN KEY (id_contest, id_language) references langtable(contestnumber, langnumber)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`DROP TABLE IF EXISTS problemlanguagetable`);
  }
}
