import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("contesttable")
class Contest {
  @PrimaryColumn()
  contestnumber!: number;

  @Column()
  contestname!: string;

  @Column()
  conteststartdate!: number;

  @Column()
  contestduration!: number;

  @Column()
  contestlastmileanswer?: number;

  @Column()
  contestlastmilescore?: number;

  @Column()
  contestlocalsite!: number;

  @Column()
  contestpenalty!: number;

  @Column()
  contestmaxfilesize!: number;

  @Column()
  contestactive!: boolean;

  @Column()
  contestmainsite!: number;

  @Column()
  contestkeys!: string;

  @Column()
  contestunlockkey!: string;

  @Column()
  contestmainsiteurl!: string;

  @UpdateDateColumn()
  updatetime!: number;
}

export { Contest };
