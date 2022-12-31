import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";
import { Contest } from "../../../src/entities/Contest";
import {
  createAlphaPass,
  createBetaPass,
  updateAlphaFail,
  updateBetaFail,
  updateCharlieFail,
  updateAlphaPass,
  updateBetaPass,
  updateBetaPass2,
} from "../../entities/Contest";
import { URL } from "../../utils/URL";

describe("Modifica os contests criados anteriormente", () => {
  let contestAlpha: Contest;
  let contestBeta: Contest;

  it("Resgata os contests a serem modificados", async () => {
    const all = await request(URL)
      .get("/api/contest")
      .set("Accept", "application/json");
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
    it('Ativa com sucesso o contest de nome "Contest Alpha"', async () => {
      expect(contestAlpha).to.deep.include(createAlphaPass);
      expect(contestAlpha.contestnumber).to.deep.equal(1);

      const response = await request(URL)
        .patch("/api/contest/1")
        .set("Accept", "application/json")
        .send(updateAlphaPass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(1);
      expect(response.body).to.deep.include(updateAlphaPass);
    });

    it('Substitui a entidade "Contest Beta" por uma modificada', async () => {
      expect(contestBeta).to.deep.include(createBetaPass);
      expect(contestBeta.contestnumber).to.deep.equal(2);

      const response = await request(URL)
        .put("/api/contest/2")
        .set("Accept", "application/json")
        .send(updateBetaPass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(2);
      expect(response.body).to.deep.include(updateBetaPass);
    });

    it('Ativa "Contest Beta", desativando "Contest Alpha" por consequência', async () => {
      let response = await request(URL)
        .patch("/api/contest/2")
        .set("Accept", "application/json")
        .send(updateBetaPass2);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(2);
      expect(response.body).to.deep.include(updateBetaPass2);

      response = await request(URL)
        .get("/api/contest/1")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(1);
      expect(response.body).to.have.own.property("contestactive");
      expect(response.body["contestactive"]).to.equal(false);
    });
  });

  describe("Fluxo negativo", () => {
    it('Tenta modificar a duração de "Contest Alpha" para um valor inválido', async () => {
      const response = await request(URL)
        .patch("/api/contest/1")
        .set("Accept", "application/json")
        .send(updateAlphaFail);
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
        .send(updateBetaFail);
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
        .send(updateCharlieFail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Contest does not exist");
    });
  });
});
