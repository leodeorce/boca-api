import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";

import { URL } from "../../utils/URL";

import { Contest } from "../../../src/entities/Contest";

import { getToken } from "../../utils/common";

import createContestAlphaPass from "../../entities/Contest/Pass/createContestAlpha.json";
import createContestBetaPass from "../../entities/Contest/Pass/createContestBeta.json";
import updateContestAlphaPass from "../../entities/Contest/Pass/updateContestAlpha.json";
import updateContestBetaPass from "../../entities/Contest/Pass/updateContestBeta.json";

import updateContestAlphaFail from "../../entities/Contest/Fail/updateContestAlpha.json";
import updateContestBetaFail from "../../entities/Contest/Fail/updateContestBeta.json";
import updateContestCharlieFail from "../../entities/Contest/Fail/updateContestCharlie.json";

describe("Modifica os contests criados anteriormente", () => {
  let systemToken: string;
  const conteststartdate = Math.floor(Date.now() / 1000);

  let contestAlpha: Contest;
  let contestBeta: Contest;

  it('Faz login no User "system"', async () => {
    systemToken = await getToken(
      "boca",
      "v512nj18986j8t9u1puqa2p9mh",
      "system"
    );
  });

  it("Resgata os contests a serem modificados", async () => {
    const all = await request(URL)
      .get("/api/contest")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${systemToken}`);

    expect(all.statusCode).to.equal(200);
    expect(all.headers["content-type"]).to.contain("application/json");
    expect(all.body).to.be.an("array");

    contestAlpha = all.body.find((contest: Contest) =>
      contest.contestname.includes("Contest Alpha")
    );

    contestBeta = all.body.find((contest: Contest) =>
      contest.contestname.includes("Contest Beta")
    );
  });

  describe("Fluxo positivo", () => {
    it('Ativa com sucesso o contest de nome "Contest Beta"', async () => {
      expect(contestBeta).to.deep.include({
        ...createContestBetaPass,
        conteststartdate: contestBeta.conteststartdate,
      });
      expect(contestBeta.contestnumber).to.deep.equal(2);

      updateContestBetaPass.conteststartdate = contestBeta.conteststartdate;

      const response = await request(URL)
        .put("/api/contest/2")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(updateContestBetaPass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(2);
      expect(response.body).to.deep.include(updateContestBetaPass);
    });

    it("Desativa o fake contest", async () => {
      const { body: fakeContest } = await request(URL)
        .get("/api/contest/0")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(fakeContest).to.have.own.property("contestnumber");
      expect(fakeContest["contestnumber"]).to.equal(0);

      fakeContest["contestactive"] = false;
      fakeContest["contestduration"] = 1;

      const response = await request(URL)
        .put("/api/contest/0")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(fakeContest);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(0);
      expect(response.body).to.deep.include(fakeContest);
    });

    it('Substitui a entidade "Contest Alpha" por uma modificada', async () => {
      expect(contestAlpha).to.deep.include({
        ...createContestAlphaPass,
        conteststartdate: contestAlpha.conteststartdate,
      });
      expect(contestAlpha.contestnumber).to.deep.equal(1);

      updateContestAlphaPass.conteststartdate = contestAlpha.conteststartdate;
      updateContestAlphaPass.conteststartdate = conteststartdate + 7200;

      const response = await request(URL)
        .put("/api/contest/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(updateContestAlphaPass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(1);
      expect(response.body).to.deep.include(updateContestAlphaPass);
    });
  });

  describe("Fluxo negativo", () => {
    it('Tenta modificar a duração de "Contest Alpha" para um valor inválido', async () => {
      const response = await request(URL)
        .put("/api/contest/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(updateContestAlphaFail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "contestduration must be greater than zero"
      );
    });

    it('Tenta substituir o site principal de "Contest Beta" pelo fake site', async () => {
      const response = await request(URL)
        .put("/api/contest/2")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(updateContestBetaFail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "contestmainsite must be greater than zero"
      );
    });

    it("Tenta modificar um contest que não existe", async () => {
      const response = await request(URL)
        .put("/api/contest/3")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(updateContestCharlieFail);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Contest does not exist");
    });
  });
});
