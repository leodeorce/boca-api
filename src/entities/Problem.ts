import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Contest } from "./Contest";

@Entity("problemtable")
class Problem {
  @ManyToOne(() => Contest, (contest) => contest.contestnumber)
  @PrimaryColumn()
  contestnumber!: number;

  @PrimaryColumn()
  problemnumber!: number;

  @Column()
  problemname!: string;

  @Column()
  problemfullname?: string;

  @Column()
  problembasefilename?: string;

  @Column()
  probleminputfilename?: string;

  @Column()
  probleminputfile?: number;

  @Column()
  probleminputfilehash?: string;

  @Column()
  fake!: boolean;

  @Column()
  problemcolorname?: string;

  @Column()
  problemcolor?: string;

  @Column()
  working_id?: number;

  @UpdateDateColumn()
  updatetime!: number;
}

export { Problem };
