import { inject, injectable } from "tsyringe";
import { createHash, generateKeyPairSync } from "crypto";
import jwt from "jsonwebtoken";
import * as fs from "fs";

import { ApiError } from "../../errors/ApiError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IContestsRepository } from "../../repositories/IContestsRepository";
import { ISitesRepository } from "../../repositories/ISitesRepository";
import { AuthPayload } from "../../shared/definitions/AuthPayload";
import { UserType } from "../../shared/definitions/UserType";

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
    // Verifica ou cria par de chaves RSA
    const secretsDir = "./secrets";
    if (!fs.existsSync(secretsDir)) {
      fs.mkdirSync(secretsDir);
    }

    const privateKeyPath = secretsDir + "/private.key";
    const publicKeyPath = secretsDir + "/public.key";

    if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
      const keyPair = generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      });
      fs.writeFileSync(privateKeyPath, keyPair.privateKey);
      fs.writeFileSync(publicKeyPath, keyPair.publicKey);
    }

    // Valida formato da hash SHA256
    const regexExp = /^[a-f0-9]{64}$/;
    if (regexExp.test(saltedPassword) != true) {
      throw ApiError.badRequest("Password hash is invalid");
    }

    let contest, site, user;

    // Usuário system deve sempre ser capaz de realizar login
    if (name === "system") {
      contest = await this.contestsRepository.getById(0);
      if (contest === undefined) {
        throw ApiError.notFound("Fake contest not found");
      }

      site = await this.sitesRepository.getById(
        contest.contestnumber,
        contest.contestlocalsite
      );
      if (site === undefined) {
        throw ApiError.inconsistency("Fake site not found");
      }

      user = await this.usersRepository.findByName(
        contest.contestnumber,
        site.sitenumber,
        UserType.SYSTEM
      );
      if (user === undefined) {
        throw ApiError.notFound('User "system" not found');
      }
    } else {
      // Checa se existe um Contest ativo
      contest = await this.contestsRepository.getActive();
      if (contest === undefined) {
        throw ApiError.notFound("There is no active contest");
      }

      // Checa se o Site ativo desse Contest existe
      site = await this.sitesRepository.getById(
        contest.contestnumber,
        contest.contestlocalsite
      );
      if (site === undefined) {
        throw ApiError.inconsistency(
          `Local site of ID ${contest.contestlocalsite}` +
            ` specified by contest "${contest.contestname}"` +
            ` of ID ${contest.contestnumber} was not found`
        );
      }

      // Busca usuário com o nome recebido nesse Contest e Site
      user = await this.usersRepository.findByName(
        contest.contestnumber,
        site.sitenumber,
        name
      );
      if (user === undefined) {
        throw ApiError.notFound(
          `User with username ${name} does not exist ` +
            `in the active contest and site`
        );
      }
    }

    // Salt deve ser a mesma usada para criar a hash recebida
    const salt = process.env.PASSWORD_SALT;
    if (salt === undefined) {
      throw ApiError.internal(
        "Cannot generate new authentication token: Password salt is not set"
      );
    }

    // Se usuário é do tipo "team", hash é guardada com um "!" no início
    const hashedPassword =
      user.usertype === "team"
        ? user.userpassword?.replace("!", "")
        : user.userpassword;

    const saltedHash = createHash("sha256")
      .update(hashedPassword + salt)
      .digest("hex");

    if (saltedHash !== saltedPassword) {
      throw ApiError.unauthorized("Wrong password");
    }

    // Cria e retorna novo token JWT
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    if (privateKey === undefined) {
      throw ApiError.internal(
        "Cannot generate new authentication token: Private key not found"
      );
    }

    const userInfo: AuthPayload = {
      contestnumber: contest.contestnumber,
      usersitenumber: site.sitenumber,
      usernumber: user.usernumber,
      username: user.username,
      usertype: user.usertype,
    };

    const tokenExpiresInSeconds = process.env.TOKEN_EXPIRES_IN_SECONDS;
    const expiresIn =
      tokenExpiresInSeconds !== undefined
        ? tokenExpiresInSeconds + "s"
        : "1800s";

    const token = jwt.sign(userInfo, privateKey, {
      issuer: "BOCA API",
      audience: "boca-api",
      expiresIn: expiresIn,
      algorithm: "RS256",
    });

    return token;
  }
}

export { GenerateTokenUseCase };
