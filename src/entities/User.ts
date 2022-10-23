import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("usertable")
class User {
  @PrimaryColumn()
  contestnumber!: number;

  @PrimaryColumn()
  usersitenumber!: number;

  @PrimaryColumn()
  usernumber!: number;

  @Column()
  username!: string;

  @Column()
  userfullname!: string;

  @Column()
  userdesc?: string;

  @Column()
  usertype!: string;

  @Column("bool")
  userenabled = true;

  @Column("bool")
  usermultilogin = false;

  @Column("varchar", { length: 200 })
  userpassword = "";

  @Column()
  userip?: string;

  @Column()
  userlastlogin?: number;

  @Column("varchar", { length: 50 })
  usersession = "";

  @Column("varchar", { length: 50 })
  usersessionextra = "";

  @Column()
  userlastlogout?: number;

  @Column()
  userpermitip?: number;

  @Column("varchar", { length: 300 })
  userinfo = "";

  @UpdateDateColumn()
  updatetime!: number;

  @Column("varchar", { length: 50 })
  usercpcid = "";
}

export { User };
