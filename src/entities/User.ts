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

  @Column()
  userenabled: boolean = true;

  @Column()
  usermultilogin: boolean = false;

  @Column()
  userpassword: string = "";

  @Column()
  userip?: string;

  @Column()
  userlastlogin?: number;

  @Column()
  usersession: string = "";

  @Column()
  usersessionextra: string = "";

  @Column()
  userlastlogout?: number;

  @Column()
  userpermitip?: number;

  @Column()
  userinfo: string = "";

  @UpdateDateColumn()
  updatetime!: number;

  @Column()
  usercpcid: string = "";
}

export { User };
