import { expect } from "chai";
import request from "supertest";
import {
  createNewUserPass,
  createUser3Pass,
  createUser4Fail,
  createUser5Fail,
} from "../../../../entities/User";
import { URL } from "../../../URL";

/**
 *  - Site 1 já deve ter sido criado em Contest Beta
 */

describe("Cria um usuário", () => {
  describe("Fluxo positivo", () => {
    it('Cria um usuário do tipo "Team" no "Site 1" de "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .send(createNewUserPass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(1);
      expect(response.body).to.deep.include(createNewUserPass);
    });

    it('Cria outro usuário do tipo "Team" com alguns campos diferentes do anterior', async () => {
      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .send(createUser3Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(3);
      expect(response.body).to.deep.include(createUser3Pass);
    });

    it("Resgata o primeiro dos dois usuários criados anteriormente", async () => {
      const response = await request(URL)
        .get("/api/contest/2/site/1/user/1")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(1);
      expect(response.body).to.deep.include(createNewUserPass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar um usuário para um site que não existe", async () => {
      const response = await request(URL)
        .post("/api/contest/2/site/4/user")
        .set("Accept", "application/json")
        .send(createUser4Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Site does not exist");
    });

    it("Tenta criar um usuário sem nome", async () => {
      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .send(createUser5Fail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("username must be longer than");
    });

    it("Tenta resgatar um usuário que não existe", async () => {
      const response = await request(URL)
        .get("/api/contest/2/site/1/user/4")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("User does not exist");
    });
  });
});
