import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";

import { ApiError } from "../../errors/ApiError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IContestsRepository } from "../../repositories/IContestsRepository";
import { ISitesRepository } from "../../repositories/ISitesRepository";
import { createHash } from "crypto";

interface IRequest {
  name: string;
  saltedPassword: string;
}

@injectable()
class GenerateTokenUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ContestsRepository")
    private contestsRepository: IContestsRepository,
    @inject("SitesRepository")
    private sitesRepository: ISitesRepository
  ) {}

  async execute({ name, saltedPassword }: IRequest): Promise<string> {
    // Valida formato da hash SHA256
    const regexExp = /^[a-f0-9]{64}$/;
    if (regexExp.test(saltedPassword) != true) {
      throw ApiError.badRequest("Password hash is invalid");
    }

    // Checa se existe um Contest ativo
    const activeContest = await this.contestsRepository.getActive();
    if (activeContest === undefined) {
      throw ApiError.notFound("There is no active contest");
    }

    // Checa se o Site ativo desse Contest existe
    const activeSite = await this.sitesRepository.getById(
      activeContest.contestnumber,
      activeContest.contestlocalsite
    );
    if (activeSite === undefined) {
      throw ApiError.inconsistency(
        `Local site of ID ${activeContest.contestlocalsite}` +
          ` specified by contest "${activeContest}"` +
          ` of ID ${activeContest.contestnumber} was not found`
      );
    }

    // Busca usuário com o nome recebido nesse Contest e Site
    const user = await this.usersRepository.findByName(
      activeContest.contestnumber,
      activeSite.sitenumber,
      name
    );
    if (user === undefined) {
      throw ApiError.notFound(
        `User with username ${name}` +
          `in the active contest and site does not exist`
      );
    }

    // Salt deve ser a mesma usada para criar a hash recebida
    const salt = process.env.PASSWORD_SALT;
    if (salt === undefined) {
      throw ApiError.internal("Password salt is not set");
    }

    // Se usuário é do tipo "team", hash é guardada com um "!" no início
    const hashedPassword =
      user.usertype === "team"
        ? user.userpassword?.replace("!", "")
        : user.userpassword;

    console.log(">" + user.userpassword + "<");
    console.log(">" + hashedPassword + "<");

    const saltedHash = createHash("sha256")
      .update(hashedPassword + salt)
      .digest("hex");

    console.log(">" + saltedHash + "<");
    // TODO Existe a possibilidade de criar um User com hash igual a ""

    if (saltedHash !== saltedPassword) {
      throw ApiError.unauthorized("Wrong password");
    }

    // Cria e retorna novo token JWT
    const secret = process.env.TOKEN_SECRET;
    if (secret === undefined) {
      throw ApiError.internal("Cannot generate new authentication token");
    }

    const userInfo = {
      contestnumber: activeContest.contestnumber,
      usersitenumber: activeSite.sitenumber,
      usernumber: user.usernumber,
      username: user.username,
      usertype: user.usertype,
    };

    const tokenExpiresInSeconds = process.env.TOKEN_EXPIRES_IN_SECONDS;
    const expiresIn =
      tokenExpiresInSeconds !== undefined
        ? tokenExpiresInSeconds + "s"
        : "1800s";

    const token = jwt.sign(userInfo, secret, {
      expiresIn: expiresIn,
    });
    return token;
  }
}

export { GenerateTokenUseCase };
