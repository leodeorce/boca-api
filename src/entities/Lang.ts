import {
  IsPositive,
  IsInt,
  Min,
  MaxLength,
  MinLength,
  IsString,
} from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("langtable")
class Lang {
  @PrimaryColumn("int4")
  @IsPositive({ message: "contestnumber must be greater than zero" })
  @IsInt()
  contestnumber!: number;

  @PrimaryColumn("int4")
  @Min(0)
  @IsInt()
  langnumber!: number;

  @Column("varchar", { length: 50 })
  @MaxLength(50)
  @MinLength(1)
  @IsString()
  langname!: string;

  @Column("varchar", { length: 20 })
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  langextension!: string;

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;
}

export { Lang };
