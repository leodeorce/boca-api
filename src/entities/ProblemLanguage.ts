import { Entity, PrimaryColumn } from "typeorm";

@Entity("problemlanguagetable")
class ProblemLanguage {
  @PrimaryColumn()
  contestnumber!: number;

  @PrimaryColumn()
  problemnumber!: number;

  @PrimaryColumn()
  langnumber!: string;
}

export { ProblemLanguage };
