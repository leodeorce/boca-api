import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Contest } from "./Contest";
import { Working } from "./Working";

@Entity("problemtable")
class Problem {
  @ManyToOne((type) => Contest, (contest) => contest.contestnumber)
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

  @ManyToOne((type) => Working, (workingItem) => workingItem.workingnumber)
  @JoinColumn()
  working?: Working;

  @UpdateDateColumn()
  updatetime!: number;
}

export { Problem };
