import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("langtable")
class Lang {
  @PrimaryColumn()
  contestnumber!: number;

  @PrimaryColumn()
  langnumber!: number;

  @Column()
  langname!: string;

  @Column()
  langextension!: string;

  @UpdateDateColumn()
  updatetime!: number;
}

export { Lang };
