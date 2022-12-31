import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";
import { User } from "../../../src/entities/User";
import {
  createNewUserPass,
  createUser3Pass,
  patchUser3Fail,
  patchUser3Pass,
  patchUser4Fail,
  updateUser1Pass,
  // updateUser3Fail,
} from "../../entities/User";
import { URL } from "../../utils/URL";

describe("Modifica os usuários criados anteriormente", () => {
  let time1: User; // TODO Trocar para site2 quando contest estiver criando o primeiro site automaticamente
  let time3: User;

  it("Resgata os users a serem modificados", async () => {
    const all = await request(URL)
      .get("/api/contest/2/site/1/user")
      .set("Accept", "application/json");
    expect(all.statusCode).to.equal(200);
    expect(all.headers["content-type"]).to.contain("application/json");
    expect(all.body).to.be.an("array");

    time1 = all.body.find((user: User) => user.usernumber === 1);
    time3 = all.body.find((user: User) => user.usernumber === 3);
  });

  describe("Fluxo positivo", () => {
    it("Modifica a senha do Time 1", async () => {
      expect(time1).to.deep.include(createNewUserPass);
      expect(time1.usernumber).to.deep.equal(1); // TODO trocar para 2

      const response = await request(URL)
        .put("/api/contest/2/site/1/user/1") // TODO trocar para 2
        .set("Accept", "application/json")
        .send(updateUser1Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(1);
      expect(response.body).to.deep.include(updateUser1Pass);
    });

    it("Modifica a descrição do Time 3", async () => {
      expect(time3).to.deep.include(createUser3Pass);
      expect(time3.usernumber).to.deep.equal(3);

      const response = await request(URL)
        .patch("/api/contest/2/site/1/user/3")
        .set("Accept", "application/json")
        .send(patchUser3Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(3);
      expect(response.body).to.have.own.property("userdesc");
      expect(response.body["userdesc"]).to.equal(patchUser3Pass.userdesc);
    });
  });

  describe("Fluxo negativo", () => {
    // TODO Habilitar quando existir validação manual

    // it("Tenta modificar a descrição do Time 3 para um valor inválido", async () => {
    //   const response = await request(URL)
    //     .put("/api/contest/2/site/1/user/3")
    //     .set("Accept", "application/json")
    //     .send(updateUser3Fail);
    //   expect(response.statusCode).to.equal(400);
    //   expect(response.headers["content-type"]).to.contain("application/json");
    //   expect(response.body).to.have.own.property("message");
    //   expect(response.body["message"]).to.include("userdesc must be longer than");
    // });

    it("Tenta modificar o contest ao qual o Time 3 pertence", async () => {
      const response = await request(URL)
        .patch("/api/contest/2/site/1/user/3")
        .set("Accept", "application/json")
        .send(patchUser3Fail);
      expect(response.statusCode).to.equal(200); // TODO Modificar para 400
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(3);
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.not.equal(
        patchUser3Fail.contestnumber
      );
    });

    it("Tenta modificar um user que não existe", async () => {
      const response = await request(URL)
        .put("/api/contest/2/site/1/user/4")
        .set("Accept", "application/json")
        .send(patchUser4Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("User does not exist");
    });
  });
});
