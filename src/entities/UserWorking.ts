import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("userworkingtable")
class UserWorking {
  @PrimaryColumn()
  id!: number;

  @Column()
  contestnumber!: number;

  @Column()
  sitenumber!: number;

  @Column()
  usernumber!: string;

  @Column()
  workingnumber!: string;
}

export { UserWorking };
