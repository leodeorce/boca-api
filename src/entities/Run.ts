import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("runtable")
class Run {
  @PrimaryColumn()
  contestnumber!: number;

  @PrimaryColumn()
  runsitenumber!: number;

  @PrimaryColumn()
  runnumber!: number;

  @Column()
  usernumber!: number;

  @Column()
  rundate!: number;

  @Column()
  rundatediff!: number;

  @Column()
  rundatediffans!: number;

  @Column()
  runproblem!: number;

  @Column()
  runfilename!: string;

  @Column()
  rundata!: number;

  @Column("int4")
  runanswer = 0;

  @Column()
  runstatus!: string;

  @Column()
  runjudge?: number;

  @Column()
  runjudgesite?: number;

  @Column("int4")
  runanswer1 = 0;

  @Column()
  runjudge1?: number;

  @Column()
  runjudgesite1?: number;

  @Column("int4")
  runanswer2 = 0;

  @Column()
  runjudge2?: number;

  @Column()
  runjudgesite2?: number;

  @Column()
  runlangnumber!: number;

  @Column()
  autoip?: string;

  @Column()
  autobegindate?: number;

  @Column()
  autoenddate?: number;

  @Column()
  autoanswer?: string;

  @Column()
  autostdout?: string;

  @Column()
  autostderr?: string;

  @UpdateDateColumn()
  updatetime!: number;
}

export { Run };
