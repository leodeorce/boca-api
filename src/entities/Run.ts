import {
  IsPositive,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
  Min,
} from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

import { IsType } from "../shared/validation/utils/IsType";

@Entity("runtable")
class Run {
  @PrimaryColumn("int4")
  @IsPositive({ message: "contestnumber must be greater than zero" })
  @IsInt()
  contestnumber!: number;

  @PrimaryColumn("int4")
  @IsPositive({ message: "runsitenumber must be greater than zero" })
  @IsInt()
  runsitenumber!: number;

  @PrimaryColumn("int4")
  @IsPositive({ message: "runnumber must be greater than zero" })
  @IsInt()
  runnumber!: number;

  @Column("int4")
  @IsPositive({ message: "usernumber must be greater than zero" })
  @IsInt()
  usernumber!: number;

  @Column("int4")
  @IsPositive({ message: "rundate must be greater than zero" })
  @IsInt()
  rundate!: number;

  @Column("int4")
  @IsPositive({ message: "rundatediff must be greater than zero" })
  @IsInt()
  rundatediff!: number;

  @Column("int4")
  @IsPositive({ message: "rundatediffans must be greater than zero" })
  @IsInt()
  rundatediffans!: number;

  @Column("int4")
  @IsPositive({ message: "runproblem must be greater than zero" })
  @IsInt()
  runproblem!: number;

  @Column("varchar", { length: 200 })
  @MaxLength(100)
  @MinLength(1)
  @IsString()
  runfilename!: string;

  @Column("bigint")
  @IsPositive({ message: "rundata must be greater than zero" })
  @IsInt()
  rundata!: number;

  @Column("int4")
  @Min(0)
  @IsInt()
  runanswer = 0;

  @Column("varchar", { length: 20 })
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  runstatus!: string;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  runjudge?: number;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  runjudgesite?: number;

  @Column("int4")
  @Min(0)
  @IsInt()
  runanswer1 = 0;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  runjudge1?: number;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  runjudgesite1?: number;

  @Column("int4")
  @Min(0)
  @IsInt()
  runanswer2 = 0;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  runjudge2?: number;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  runjudgesite2?: number;

  @Column("int4")
  @Min(0)
  @IsInt()
  runlangnumber!: number;

  @Column("varchar", { length: 20, nullable: true })
  @IsType(["string", "undefined"])
  autoip?: string;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  autobegindate?: number;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  autoenddate?: number;

  @Column("text", { nullable: true })
  @IsType(["string", "undefined"])
  autoanswer?: string;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  autostdout?: number;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  autostderr?: number;

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;
}

export { Run };
