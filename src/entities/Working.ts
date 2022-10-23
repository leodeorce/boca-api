import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Problem } from "./Problem";

@Entity("workingtable")
class Working {
  @Column()
  contestnumber!: number;

  @PrimaryColumn()
  workingnumber!: number;

  @Column()
  name!: string;

  @Column()
  start_date!: number;

  @Column()
  end_date!: number;

  @Column()
  last_answer_date!: number;

  @Column()
  max_file_size!: number;

  @CreateDateColumn()
  created_at?: number;

  @Column()
  is_multilogin!: boolean;

  @DeleteDateColumn()
  deleted_at?: number;

  @UpdateDateColumn()
  updated_at!: number;

  @OneToMany(() => Problem, (problem) => problem.problemnumber)
  problems?: Problem[];
}

export { Working };
