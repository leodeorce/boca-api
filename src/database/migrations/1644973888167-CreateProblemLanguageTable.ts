import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProblemLanguageTable1644973888167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      return queryRunner.query(`
        CREATE TABLE problemlanguage (
          id SERIAL,
          id_problem INT,
          id_language INT,
          PRIMARY KEY(id),
          FOREIGN KEY (id_problem) references problemtable(problemnumber),
          FOREIGN KEY (id_language) references langtable(langnumber)
        );
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      return queryRunner.query(`DROP TABLE problemlanguage`)
    }

}
