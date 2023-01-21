import { expect } from "chai";
import request from "supertest";

import { URL } from "../../utils/URL";

import { getToken } from "../../utils/common";

import createContestCharlie from "../../entities/Contest/Fail/createContestCharlie.json";

import createProblem1 from "../../entities/Problem/Pass/createProblem1.json";
import updateProblem1 from "../../entities/Problem/Pass/updateProblem1.json";

import updateRun1 from "../../entities/Run/Pass/updateRun1.json";

describe("Fluxos de login de um usuário", () => {
  const salt = "v512nj18986j8t9u1puqa2p9mh";
  let tokenTeam: string;
  let tokenAdmin: string;
  let tokenSystem: string;
  let tokenJudge: string;

  it('Faz login no User "Time 2"', async () => {
    tokenTeam = await getToken("", salt, "time2");
  });

  it('Faz login no User "system"', async () => {
    tokenSystem = await getToken("boca", salt, "system");
  });

  it('Faz login no User "judge"', async () => {
    tokenJudge = await getToken("boca", salt, "judge");
  });

  it('Faz login no User "admin"', async () => {
    tokenAdmin = await getToken("boca", salt, "admin");
  });

  describe("Fluxo negativo", () => {
    it('Usuário do tipo "team" tenta criar um contest', async () => {
      createContestCharlie.conteststartdate = Math.floor(Date.now() / 1000);

      const response = await request(URL)
        .post("/api/contest")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${tokenTeam}`)
        .send(createContestCharlie);

      expect(response.statusCode).to.equal(403);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "Authenticated user is unauthorized to use this endpoint"
      );
    });

    it('Usuário do tipo "judge" tenta atualizar um problem', async () => {
      const response = await request(URL)
        .put(`/api/contest/2/problem/${createProblem1.problemnumber}`)
        .set("Accept", "application/json")
        .set("Authorization", `Token ${tokenJudge}`)
        .send(updateProblem1);

      expect(response.statusCode).to.equal(403);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "Authenticated user is unauthorized to use this endpoint"
      );
    });

    it('Usuário do tipo "admin" tenta deletar um contest', async () => {
      const response = await request(URL)
        .delete("/api/contest/2")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${tokenAdmin}`);

      expect(response.statusCode).to.equal(403);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "Authenticated user is unauthorized to use this endpoint"
      );
    });

    it('Usuário do tipo "system" tenta atualizar uma run', async () => {
      const response = await request(URL)
        .put("/api/contest/2/problem/2022102/run/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${tokenSystem}`)
        .send(updateRun1);

      expect(response.statusCode).to.equal(403);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "Authenticated user is unauthorized to use this endpoint"
      );
    });
  });
});
