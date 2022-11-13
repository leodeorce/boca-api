import {
  IsPositive,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  Min,
} from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("answertable")
class Answer {
  @PrimaryColumn("int4")
  @IsPositive({ message: "contestnumber must be greater than zero" })
  @IsInt()
  contestnumber!: number;

  @PrimaryColumn("int4")
  @Min(0)
  @IsInt()
  answernumber!: number;

  @Column("varchar", { length: 50 })
  @MaxLength(50)
  @MinLength(1)
  @IsString()
  runanswer!: string;

  @Column("bool")
  @IsBoolean()
  yes!: boolean;

  @Column("bool")
  @IsBoolean()
  fake!: boolean;

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;
}

export { Answer };
