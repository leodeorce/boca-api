import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";

import { Run } from "../../../src/entities/Run";

import { URL } from "../../utils/URL";

import createRun1Pass from "../../entities/Run/Pass/createRun1.json";
import createRun2Pass from "../../entities/Run/Pass/createRun2.json";
import createRun3Pass from "../../entities/Run/Pass/createRun3.json";
import updateRun1Pass from "../../entities/Run/Pass/updateRun1.json";
import updateRun2Pass from "../../entities/Run/Pass/updateRun2.json";

import updateRun3Fail from "../../entities/Run/Fail/updateRun3.json";
import updateRun4Fail from "../../entities/Run/Fail/updateRun4.json";

describe("Modifica as runs criadas anteriormente", () => {
  let run1: Run;
  let run2: Run;
  let run3: Run;

  it("Resgata as runs a serem modificadas", async () => {
    const all = await request(URL)
      .get("/api/contest/2/problem/2022102/run")
      .set("Accept", "application/json");
    expect(all.statusCode).to.equal(200);
    expect(all.headers["content-type"]).to.contain("application/json");
    expect(all.body).to.be.an("array");

    run1 = all.body.find((run: Run) => run.runnumber === 1);
    run2 = all.body.find((run: Run) => run.runnumber === 2);
    run3 = all.body.find((run: Run) => run.runnumber === 3);

    expect(run1).to.deep.include(createRun1Pass);
    expect(run2).to.deep.include(createRun2Pass);
    expect(run3).to.deep.include(createRun3Pass);
  });

  describe("Fluxo positivo", () => {
    it('Modifica o status da run 1 do problema "L1_2" em "Contest Beta"', async () => {
      const response = await request(URL)
        .put("/api/contest/2/problem/2022102/run/1")
        .set("Accept", "application/json")
        .send(updateRun1Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createRun1Pass);
      expect(response.body).to.deep.include(updateRun1Pass);
    });

    it('Adiciona propriedades opcionais à run 2 do problema "L1_2" em "Contest Beta"', async () => {
      const response = await request(URL)
        .put("/api/contest/2/problem/2022102/run/2")
        .set("Accept", "application/json")
        .send(updateRun2Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createRun2Pass);
      expect(response.body).to.deep.include(updateRun2Pass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta modificar a answer da run 3 com propriedades obrigatórias faltando", async () => {
      const response = await request(URL)
        .put("/api/contest/2/problem/2022102/run/3")
        .set("Accept", "application/json")
        .send(updateRun3Fail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Missing");
    });

    it("Tenta modificar uma run que não existe", async () => {
      const response = await request(URL)
        .put("/api/contest/2/problem/2022102/run/4")
        .set("Accept", "application/json")
        .send(updateRun4Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Run does not exist");
    });
  });
});
