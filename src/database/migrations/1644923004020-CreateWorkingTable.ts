import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkingTable1644923004020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        CREATE TABLE workingtable (
          contestnumber INT,
          workingnumber SERIAL,
          name varchar(255) NOT NULL,
          start_date INT,
          end_date INT,
          last_answer_date INT,
          max_file_size INT DEFAULT 100,
          created_at INT DEFAULT EXTRACT(epoch FROM now()),
          updated_at integer DEFAULT EXTRACT(epoch FROM now()),
          is_multilogin BOOLEAN DEFAULT false,
          deleted_at INT,
          PRIMARY KEY(workingnumber),
          FOREIGN KEY (contestnumber) REFERENCES contesttable(contestnumber)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        DROP TABLE IF EXISTS workingtable;
      `);
  }
}
