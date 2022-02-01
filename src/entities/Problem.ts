import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("problemtable")
class Problem {
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

  @UpdateDateColumn()
  updatetime!: number;
}

export { Problem };
