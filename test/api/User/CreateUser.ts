import { expect } from "chai";
import request from "supertest";
import { createHash } from "crypto";

import { URL } from "../../utils/URL";

import { getToken } from "../../utils/common";

import createUser1Pass from "../../entities/User/Pass/createUser1.json";
import createUser2Pass from "../../entities/User/Pass/createUser2.json";
import createUser3Pass from "../../entities/User/Pass/createUser3.json";
import createUserJudgePass from "../../entities/User/Pass/createUserJudge.json";
import createUserAdminPass from "../../entities/User/Pass/createUserAdmin.json";

import createUser4Fail from "../../entities/User/Fail/createUser4.json";
import createUser5Fail from "../../entities/User/Fail/createUser5.json";

describe("Cria um usuário", () => {
  let systemToken: string;

  it('Faz login no User "system"', async () => {
    systemToken = await getToken(
      "boca",
      "v512nj18986j8t9u1puqa2p9mh",
      "system"
    );
  });

  describe("Fluxo positivo", () => {
    it('Cria um usuário "Time 1" do tipo "team" no "Site 1" de "Contest Beta"', async () => {
      const password = createHash("sha256").update("boca").digest("hex");
      createUser1Pass.userpassword = password;

      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createUser1Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(1);
      expect(response.body).to.deep.include({
        ...createUser1Pass,
        userpassword: "!" + password,
      });
    });

    it('Cria um usuário "Time 2" do tipo "team" no "Site 1" de "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createUser2Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(2);
      expect(response.body).to.deep.include(createUser2Pass);
    });

    it('Cria um usuário "Time 3" do tipo "team" com alguns campos diferentes do anterior', async () => {
      const password = createHash("sha256").update("boca").digest("hex");
      createUser3Pass.userpassword = password;

      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createUser3Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(3);
      expect(response.body).to.deep.include({
        ...createUser3Pass,
        userpassword: "!" + password,
      });
    });

    it('Cria um usuário "judge" do tipo "judge"', async () => {
      const password = createHash("sha256").update("boca").digest("hex");
      createUserJudgePass.userpassword = password;

      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createUserJudgePass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(4);
      expect(response.body).to.deep.include({
        ...createUserJudgePass,
        userpassword: password,
      });
    });

    it('Cria um usuário "judge" do tipo "admin"', async () => {
      const password = createHash("sha256").update("boca").digest("hex");
      createUserAdminPass.userpassword = password;

      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createUserAdminPass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(5);
      expect(response.body).to.deep.include({
        ...createUserAdminPass,
        userpassword: password,
      });
    });

    it("Resgata o primeiro dos usuários criados anteriormente", async () => {
      const response = await request(URL)
        .get("/api/contest/2/site/1/user/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(1);
      for (const key of Object.keys(createUser1Pass)) {
        expect(Object.keys(response.body)).to.deep.include(key);
      }
      expect(response.body).to.have.own.property("userpassword");
      expect(response.body["userpassword"]).to.contain("!");
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar um usuário para um site que não existe", async () => {
      const response = await request(URL)
        .post("/api/contest/2/site/4/user")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createUser4Fail);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Site does not exist");
    });

    it("Tenta criar um usuário sem nome", async () => {
      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createUser5Fail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Missing: username");
    });

    it("Tenta resgatar um usuário que não existe", async () => {
      const response = await request(URL)
        .get("/api/contest/2/site/1/user/6")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("User does not exist");
    });
  });
});
