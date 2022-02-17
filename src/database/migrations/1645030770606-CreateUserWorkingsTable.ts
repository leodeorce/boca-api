import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserWorkingsTable1645030770606
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        CREATE TABLE userworkingtable (
          sitenumber INT,
          contestnumber INT,
          usernumber INT,
          workingnumber INT,
          PRIMARY KEY(sitenumber, contestnumber, usernumber, workingnumber),
          FOREIGN KEY (sitenumber, contestnumber, usernumber) REFERENCES usertable(usersitenumber, contestnumber, usernumber),
          FOREIGN KEY (workingnumber) REFERENCES workingtable( workingnumber)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        DROP TABLE IF EXISTS userworkingtable;
      `);
  }
}
