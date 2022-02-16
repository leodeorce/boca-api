import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateWorkingTable1644923004020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      return queryRunner.query(`
        CREATE TABLE workingtable (
          workingnumber SERIAL,
          name varchar(255),
          start_date timestamp,
          end_date timestamp,
          last_answer_date timestamp,
          max_file_size INT,
          created_at timestamp DEFAULT NOW(),
          updated_at timestamp DEFAULT NOW(),
          is_multilogin BOOLEAN,
          deleted_at timestamp,
          PRIMARY KEY(workingnumber)
        );


      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      return queryRunner.query(`
        DROP TABLE workingtable;
        DELETE FUNCTION trigger_set_timestamp();
        DELETE TRIGGER set_timestamp();
      `)
    }

}
