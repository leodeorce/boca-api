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

import { IsType } from "../shared/validation/utils/IsType";

@Entity("contesttable")
class Contest {
  @PrimaryColumn("int4")
  @Min(0)
  @IsInt()
  contestnumber!: number;

  @Column("varchar", { length: 100 })
  @MaxLength(100)
  @MinLength(1)
  @IsString()
  contestname!: string;

  @Column("int4")
  @IsPositive({ message: "conteststartdate must be greater than zero" })
  @IsInt()
  conteststartdate!: number;

  @Column("int4")
  @IsPositive({ message: "contestduration must be greater than zero" })
  @IsInt()
  contestduration!: number;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  contestlastmileanswer: number | undefined;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"])
  contestlastmilescore: number | undefined;

  @Column("int4")
  @IsInt()
  @IsPositive({ message: "contestlocalsite must be greater than zero" })
  contestlocalsite!: number;

  @Column("int4")
  @IsInt()
  @Min(0)
  contestpenalty!: number;

  @Column("int4")
  @IsInt()
  @IsPositive({ message: "contestmaxfilesize must be greater than zero" })
  contestmaxfilesize!: number;

  @Column("bool")
  @IsBoolean()
  contestactive!: boolean;

  @Column("int4")
  @IsInt()
  @IsPositive({ message: "contestmainsite must be greater than zero" })
  contestmainsite!: number;

  @Column("text")
  @IsString()
  @MinLength(0)
  contestkeys!: string;

  @Column("varchar", { length: 100 })
  @IsString()
  @MinLength(0)
  @MaxLength(100)
  contestunlockkey!: string;

  @Column("varchar", { length: 200 })
  @IsString()
  @MinLength(0)
  @MaxLength(100)
  contestmainsiteurl!: string;

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;

  constructor(
    contestnumber: number,
    contestname: string,
    conteststartdate: number,
    contestduration: number,
    contestlastmileanswer: number | undefined = undefined,
    contestlastmilescore: number | undefined = undefined,
    contestlocalsite: number,
    contestpenalty: number,
    contestmaxfilesize: number,
    contestactive: boolean,
    contestmainsite: number,
    contestkeys: string,
    contestunlockkey: string,
    contestmainsiteurl: string
  ) {
    this.contestnumber = contestnumber;
    this.contestname = contestname;
    this.conteststartdate = conteststartdate;
    this.contestduration = contestduration;
    this.contestlastmileanswer = contestlastmileanswer;
    this.contestlastmilescore = contestlastmilescore;
    this.contestlocalsite = contestlocalsite;
    this.contestpenalty = contestpenalty;
    this.contestmaxfilesize = contestmaxfilesize;
    this.contestactive = contestactive;
    this.contestmainsite = contestmainsite;
    this.contestkeys = contestkeys;
    this.contestunlockkey = contestunlockkey;
    this.contestmainsiteurl = contestmainsiteurl;
  }
}

export { Contest };
