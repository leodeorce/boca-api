import {
  IsBoolean,
  IsInt,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

import { IsType } from "../shared/validation/utils/IsType";

@Entity("usertable")
class User {
  @PrimaryColumn("int4")
  @IsPositive({ message: "contestnumber must be greater than zero" })
  @IsInt()
  contestnumber!: number;

  @PrimaryColumn("int4")
  @IsPositive({ message: "usersitenumber must be greater than zero" })
  @IsInt()
  usersitenumber!: number;

  @PrimaryColumn("int4")
  @IsPositive({ message: "usernumber must be greater than zero" })
  @IsInt()
  usernumber!: number;

  @Column("varchar", { length: 20 })
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  username!: string;

  @Column("varchar", { length: 200 })
  @MaxLength(200)
  @MinLength(1)
  @IsString()
  userfullname!: string;

  @Column("varchar", { length: 300 })
  @IsType(["string", "undefined"], {
    message: "If specified, userdesc must be a string",
  })
  userdesc: string | undefined;

  @Column("varchar", { length: 20 })
  @Matches(/^(judge){1}$|^(team){1}$|^(admin){1}$|^(system){1}$/, {
    message: "usertype must be one of [judge, team, admin, system]",
  })
  @IsString()
  usertype!: string;

  @Column("bool")
  @IsBoolean()
  userenabled!: boolean;

  @Column("bool")
  @IsBoolean()
  usermultilogin!: boolean;

  @Column("varchar", { length: 200, nullable: true })
  @IsType(["string", "undefined"], {
    message: "If specified, userpassword must be a string",
  })
  userpassword: string | undefined;

  @Column("varchar", { length: 300, nullable: true })
  @IsType(["string", "undefined"], {
    message: "If specified, userip must be a string",
  })
  userip: string | undefined;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"], {
    message: "If specified, userlastlogin must be a number",
  })
  userlastlogin: number | undefined;

  @Column("varchar", { length: 50, nullable: true })
  @IsType(["string", "undefined"], {
    message: "If specified, usersession must be a string",
  })
  usersession: string | undefined;

  @Column("varchar", { length: 50, nullable: true })
  @IsType(["string", "undefined"], {
    message: "If specified, usersessionextra must be a string",
  })
  usersessionextra: string | undefined;

  @Column("int4", { nullable: true })
  @IsType(["number", "undefined"], {
    message: "If specified, userlastlogout must be a number",
  })
  userlastlogout: number | undefined;

  @Column("varchar", { length: 300, nullable: true })
  @IsType(["string", "undefined"], {
    message: "If specified, userpermitip must be a string",
  })
  userpermitip: string | undefined;

  @Column("varchar", { length: 300, nullable: true })
  @IsType(["string", "undefined"], {
    message: "If specified, userinfo must be a string",
  })
  userinfo: string | undefined;

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;

  @Column("varchar", { length: 50, nullable: true })
  @IsType(["string", "undefined"], {
    message: "If specified, usericpcid must be a string",
  })
  usericpcid: string | undefined;

  constructor(
    contestnumber: number,
    usernumber: number,
    usersitenumber: number,
    username: string,
    userfullname: string,
    userdesc: string | undefined,
    usertype: string,
    userenabled = true,
    usermultilogin = false,
    userpassword: string | undefined = "",
    userip: string | undefined = undefined,
    userlastlogin: number | undefined = undefined,
    usersession: string | undefined = "",
    usersessionextra: string | undefined = "",
    userlastlogout: number | undefined = undefined,
    userpermitip: string | undefined = undefined,
    userinfo: string | undefined = "",
    usericpcid: string | undefined = ""
  ) {
    this.contestnumber = contestnumber;
    this.usernumber = usernumber;
    this.usersitenumber = usersitenumber;
    this.username = username;
    this.userfullname = userfullname;
    this.userdesc = userdesc;
    this.usertype = usertype;
    this.userenabled = userenabled;
    this.usermultilogin = usermultilogin;
    this.userpassword = userpassword;
    this.userip = userip;
    this.userlastlogin = userlastlogin;
    this.usersession = usersession;
    this.usersessionextra = usersessionextra;
    this.userlastlogout = userlastlogout;
    this.userpermitip = userpermitip;
    this.userinfo = userinfo;
    this.usericpcid = usericpcid;
  }
}

export { User };
