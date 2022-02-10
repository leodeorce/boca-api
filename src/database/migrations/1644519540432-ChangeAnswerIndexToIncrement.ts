import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAnswerIndexToIncrement1644519540432
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
      CREATE SEQUENCE answer_id_seq OWNED BY answertable.answernumber;
  
      ALTER TABLE answertable ALTER COLUMN answernumber SET DEFAULT nextval('answer_id_seq');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
    ALTER TABLE answertable ALTER COLUMN answernumber SET DEFAULT 0;
  `);
  }
}
