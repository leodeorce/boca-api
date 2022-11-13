import {
  IsBoolean,
  IsInt,
  IsPositive,
  IsString,
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

  // TODO Validar manualmente
  @Column("varchar", { length: 300 })
  // @MaxLength(300)
  // @MinLength(1)  // TODO Criar uma anotação manual parecida com IsType
  @IsType(["string", "undefined"])
  userdesc?: string;

  @Column("varchar", { length: 20 })
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  usertype!: string;

  @Column("bool")
  @IsBoolean()
  userenabled = true;

  @Column("bool")
  @IsBoolean()
  usermultilogin = false;

  @Column("varchar", { length: 200 })
  @MaxLength(200)
  @MinLength(0)
  @IsString()
  userpassword = "";

  // TODO Validar manualmente
  @Column("varchar", { length: 300 })
  // @MaxLength(300)
  // @MinLength(8)
  @IsType(["string", "undefined"])
  userip?: string;

  // TODO Validar manualmente
  @Column("int4")
  // @IsPositive({ message: "userlastlogin must be greater than zero" })
  @IsType(["number", "undefined"], {
    message: "If specified, userlastlogin must be greater than zero",
  })
  userlastlogin?: number;

  @Column("varchar", { length: 50 })
  @MaxLength(50)
  @MinLength(0)
  @IsString()
  usersession = "";

  @Column("varchar", { length: 50 })
  @MaxLength(50)
  @MinLength(0)
  @IsString()
  usersessionextra = "";

  // TODO Validar manualmente
  @Column("int4")
  // @IsPositive({ message: "userlastlogout must be greater than zero" })
  @IsType(["number", "undefined"], {
    message: "If specified, userlastlogout must be greater than zero",
  })
  userlastlogout?: number;

  // TODO Validar manualmente
  @Column("varchar", { length: 300 })
  // @MaxLength(300)
  // @MinLength(8)
  @IsType(["string", "undefined"])
  userpermitip?: string;

  @Column("varchar", { length: 300 })
  @MaxLength(300)
  @MinLength(0)
  @IsString()
  userinfo = "";

  @Column("int4", { default: "EXTRACT(EPOCH FROM now())" })
  updatetime!: number;

  @Column("varchar", { length: 50 })
  @MaxLength(50)
  @MinLength(0)
  @IsString()
  usericpcid = "";
}

export { User };
