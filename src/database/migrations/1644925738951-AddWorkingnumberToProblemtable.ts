import {MigrationInterface, QueryRunner} from "typeorm";

export class AddWorkingnumberToProblemtable1644925738951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      return Promise.resolve();
      return queryRunner.query(`
         ALTER TABLE problemtable ADD workingnumber INT;
          
         ALTER TABLE problemtable ADD CONSTRAINT workingnumber_fk FOREIGN KEY (contestnumber, workingnumber) REFERENCES workingtable(contestnumber, workingnumber);
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      return Promise.resolve();
      return queryRunner.query(`
      ALTER TABLE problemtable (
        DELETE workingnumber
      );`)
    }

}
