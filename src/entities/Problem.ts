import {
  IsPositive,
  IsInt,
  Min,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
} from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

import { IsType } from "../shared/validation/utils/IsType";

@Entity("problemtable")
class Problem {
  @PrimaryColumn("int4")
  @IsPositive({ message: "contestnumber must be greater than zero" })
  @IsInt()
  contestnumber!: number;

  @PrimaryColumn("int4")
  @Min(0)
  @IsInt()
  problemnumber!: number;

  @Column("varchar", { length: 20 })
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  problemname!: string;

  @Column("varchar", { length: 100 })
  @IsType(["string", "undefined"])
  problemfullname?: string;

  @Column("varchar", { length: 100 })
  @IsType(["string", "undefined"])
  problembasefilename?: string;

  @Column("varchar", { length: 100 })
  @IsType(["string", "undefined"])
  probleminputfilename?: string;

  @Column("bigint")
  @IsType(["number", "undefined"])
  probleminputfile?: number;

  @Column("varchar", { length: 50 })
  @IsType(["string", "undefined"])
  probleminputfilehash?: string;

  @Column("bool")
  @IsBoolean()
  fake!: boolean;

  @Column("varchar", { length: 100 })
  @IsType(["string", "undefined"])
  problemcolorname?: string;

  @Column("varchar", { length: 6 })
  @IsType(["string", "undefined"])
  problemcolor?: string;

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;
}

export { Problem };
