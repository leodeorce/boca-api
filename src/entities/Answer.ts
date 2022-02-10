import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("answertable")
class Answer {
  @PrimaryColumn()
  contestnumber!: number;

  @PrimaryColumn()
  answernumber!: number;

  @Column()
  runanswer!: string;

  @Column()
  yes?: boolean;

  @Column()
  fake?: boolean;

  @UpdateDateColumn()
  updatetime!: number;
}
export { Answer };
