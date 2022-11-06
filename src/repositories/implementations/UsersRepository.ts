import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { User } from "../../entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
  IUpdateUserDTO,
  ILastIdResult,
} from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async list(contestnumber: number, usersitenumber: number): Promise<User[]> {
    return await this.repository.find({
      where: { contestnumber: contestnumber, usersitenumber: usersitenumber },
    });
  }

  async findByName(name: string): Promise<User | undefined> {
    const query = `
      SELECT * FROM usertable WHERE username = '${name}'
    `;
    const user: User[] = await this.repository.query(query);
    if (user.length === 0) {
      return undefined;
    }
    return user[0];
  }

  async getLastId(
    contestnumber: number,
    usersitenumber: number
  ): Promise<number | undefined> {
    const lastIdResult: ILastIdResult | undefined = await this.repository
      .createQueryBuilder("user")
      .select("MAX(user.usernumber)", "id")
      .where("user.contestnumber = :contestnumber", {
        contestnumber: contestnumber,
      })
      .andWhere("user.usersitenumber = :usersitenumber", {
        usersitenumber: usersitenumber,
      })
      .getRawOne();

    return lastIdResult !== undefined ? lastIdResult.id : undefined;
  }

  async getById(
    contestnumber: number,
    usersitenumber: number,
    usernumber: number
  ): Promise<User | undefined> {
    const user: User | null = await this.repository.findOneBy({
      contestnumber: contestnumber,
      usersitenumber: usersitenumber,
      usernumber: usernumber,
    });
    return user != null ? user : undefined;
  }

  async create(createObject: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(createObject);
    await this.repository.save(user);
    return user;
  }

  async update(updateObject: IUpdateUserDTO): Promise<User> {
    const result = await this.repository
      .createQueryBuilder()
      .update(User)
      .set(updateObject)
      .where("contestnumber = :contestnumber", {
        contestnumber: updateObject.contestnumber,
      })
      .andWhere("usersitenumber = :usersitenumber", {
        usersitenumber: updateObject.usersitenumber,
      })
      .andWhere("usernumber = :usernumber", {
        usernumber: updateObject.usernumber,
      })
      .returning("*")
      .execute();

    const updatedUser: Record<string, unknown> = result.raw[0];
    return this.repository.create(updatedUser);
  }

  async delete(
    contestnumber: number,
    usersitenumber: number,
    usernumber: number
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("contestnumber = :contestnumber", { contestnumber: contestnumber })
      .andWhere("usersitenumber = :usersitenumber", {
        usersitenumber: usersitenumber,
      })
      .andWhere("usernumber = :usernumber", {
        usernumber: usernumber,
      })
      .execute();
  }
}

export { UsersRepository };
