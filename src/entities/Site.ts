import { Column, Entity, PrimaryColumn } from "typeorm";
import {
  IsBoolean,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

@Entity("sitetable")
class Site {
  @PrimaryColumn("int4")
  @IsInt()
  @IsPositive({ message: "contestnumber must be greater than zero" })
  contestnumber!: number;

  @PrimaryColumn("int4")
  @IsInt()
  @IsPositive({ message: "sitenumber must be greater than zero" })
  sitenumber!: number;

  @Column("varchar", { length: 200 })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  siteip!: string;

  @Column("varchar", { length: 50 })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  sitename!: string;

  @Column("bool")
  @IsBoolean()
  siteactive!: boolean;

  @Column("bool")
  @IsBoolean()
  sitepermitlogins!: boolean;

  @Column("int4", { nullable: true })
  @IsInt()
  @Min(0)
  sitelastmileanswer?: number;

  @Column("int4", { nullable: true })
  @IsInt()
  @Min(0)
  sitelastmilescore?: number;

  @Column("int4", { nullable: true })
  @IsInt()
  @IsPositive({ message: "siteduration must be greater than zero" })
  siteduration?: number;

  @Column("bool", { nullable: true })
  @IsBoolean()
  siteautoend?: boolean;

  @Column("text", { nullable: true })
  @IsString()
  sitejudging?: string;

  @Column("text", { nullable: true })
  @IsString()
  sitetasking?: string;

  @Column("varchar", { length: 50 })
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  siteglobalscore = "";

  @Column("int4")
  @IsInt()
  @Min(0)
  sitescorelevel = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitenextuser = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitenextclar = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitenextrun = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitenexttask = 0;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitemaxtask = 8;

  @Column("varchar", { length: 20 })
  @IsString()
  @MinLength(0)
  @MaxLength(20)
  sitechiefname!: string;

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;

  @Column("bool")
  @IsBoolean()
  siteautojudge = false;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitemaxruntime = 600;

  @Column("int4")
  @IsInt()
  @Min(0)
  sitemaxjudgewaittime = 900;
}

export { Site };
