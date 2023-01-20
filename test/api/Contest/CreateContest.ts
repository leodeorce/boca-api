import { expect } from "chai";
import { createHash } from "crypto";
import request from "supertest";

import { URL } from "../../utils/URL";

import createContestAlphaPass from "../../entities/Contest/Pass/createContestAlpha.json";
import createContestBetaPass from "../../entities/Contest/Pass/createContestBeta.json";

import createContestCharlieFail from "../../entities/Contest/Fail/createContestCharlie.json";
import createContestDeltaFail from "../../entities/Contest/Fail/createContestDelta.json";
import createContestEchoFail from "../../entities/Contest/Fail/createContestEcho.json";

describe("Criação de um contest", () => {
  let systemToken: string;
  const conteststartdate = Math.floor(Date.now() / 1000);

  it('Resgata um token de autenticação para "system"', async () => {
    const salt = "v512nj18986j8t9u1puqa2p9mh";
    const password = createHash("sha256").update("boca").digest("hex");
    const hash = createHash("sha256")
      .update(password + salt)
      .digest("hex");

    const response = await request(URL)
      .get("/api/token")
      .query({
        name: "system",
        password: hash,
      })
      .set("Accept", "application/json");

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");

    const { accessToken } = response.body;
    const count = accessToken.match(/\./g)?.length;
    expect(count).to.equal(2);

    systemToken = accessToken;
  });

  describe("Fluxo positivo", () => {
    it("Cria um contest (conjunto de valores aceitáveis)", async () => {
      createContestAlphaPass.conteststartdate = conteststartdate + 3600;

      const response = await request(URL)
        .post("/api/contest")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createContestAlphaPass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(1);
      expect(response.body).to.deep.include(createContestAlphaPass);
    });

    it("Cria um segundo contest (conjunto diferente de valores aceitáveis)", async () => {
      createContestBetaPass.conteststartdate = conteststartdate - 3600;

      const response = await request(URL)
        .post("/api/contest")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createContestBetaPass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(2);
      expect(response.body).to.deep.include(createContestBetaPass);
    });

    it('Resgata o "Contest Alpha" criado anteriormente', async () => {
      const response = await request(URL)
        .get("/api/contest/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(1);
      expect(response.body).to.deep.include(createContestAlphaPass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar um contest com um nome inválido", async () => {
      createContestCharlieFail.conteststartdate = conteststartdate;

      const response = await request(URL)
        .post("/api/contest")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createContestCharlieFail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "contestname must be longer than"
      );
    });

    it("Tenta criar um contest de duração inválida", async () => {
      createContestDeltaFail.conteststartdate = conteststartdate - 300;

      const response = await request(URL)
        .post("/api/contest")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createContestDeltaFail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "contestduration must be greater than zero"
      );
    });

    it("Tenta criar um contest sem especificar alguma propriedade obrigatória", async () => {
      const response = await request(URL)
        .post("/api/contest")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createContestEchoFail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Missing: conteststartdate");
    });

    it("Tenta resgatar um contest que não existe", async () => {
      const response = await request(URL)
        .get("/api/contest/3")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Contest does not exist");
    });
  });
});
