import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";

import { Problem } from "../../../src/entities/Problem";

import { URL } from "../../utils/URL";

import createProblem1Pass from "../../entities/Problem/Pass/createProblem1.json";
import createProblem2Pass from "../../entities/Problem/Pass/createProblem2.json";
import updateProblem1Pass from "../../entities/Problem/Pass/updateProblem1.json";
import updateProblem2Pass from "../../entities/Problem/Pass/updateProblem2.json";

import updateProblem1Fail from "../../entities/Problem/Fail/updateProblem1.json";
import updateProblem3Fail from "../../entities/Problem/Fail/updateProblem3.json";

describe("Modifica os problemas criados anteriormente", () => {
  let problem1: Problem;
  let problem2: Problem;

  it("Resgata os problemas a serem modificados", async () => {
    const all = await request(URL)
      .get("/api/contest/2/problem")
      .set("Accept", "application/json");
    expect(all.statusCode).to.equal(200);
    expect(all.headers["content-type"]).to.contain("application/json");
    expect(all.body).to.be.an("array");

    problem1 = all.body.find(
      (problem: Problem) =>
        problem.problemnumber === createProblem1Pass.problemnumber
    );
    problem2 = all.body.find(
      (problem: Problem) =>
        problem.problemnumber === createProblem2Pass.problemnumber
    );

    expect(problem1).to.deep.include(createProblem1Pass);
    expect(problem2).to.deep.include(createProblem2Pass);
  });

  describe("Fluxo positivo", () => {
    it('Modifica o nome do problema "L1_1" em "Contest Beta"', async () => {
      const response = await request(URL)
        .put(`/api/contest/2/problem/${createProblem1Pass.problemnumber}`)
        .set("Accept", "application/json")
        .send(updateProblem1Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("problemnumber");
      expect(response.body["problemnumber"]).to.equal(
        createProblem1Pass.problemnumber
      );
      expect(response.body).to.deep.include(updateProblem1Pass);
    });

    it('Adiciona propriedades opcionais ao problema "L1_2" em "Contest Beta"', async () => {
      const response = await request(URL)
        .put(`/api/contest/2/problem/${createProblem2Pass.problemnumber}`)
        .set("Accept", "application/json")
        .send(updateProblem2Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("problemnumber");
      expect(response.body["problemnumber"]).to.equal(
        createProblem2Pass.problemnumber
      );
      expect(response.body).to.deep.include(updateProblem2Pass);
    });

    it('Modifica o arquivo do problema "L1_2" em "Contest Beta"', async () => {
      const response = await request(URL)
        .put(`/api/contest/2/problem/${createProblem2Pass.problemnumber}/file`)
        .attach("probleminputfile", "test/files/L1_2.zip");
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(updateProblem2Pass);
    });
  });

  describe("Fluxo negativo", () => {
    it('Tenta modificar o nome do problema "Problem 1" com propriedades obrigatórias faltando', async () => {
      const response = await request(URL)
        .put(`/api/contest/2/problem/${createProblem1Pass.problemnumber}`)
        .set("Accept", "application/json")
        .send(updateProblem1Fail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Missing");
    });

    it("Tenta modificar um problema que não existe", async () => {
      const response = await request(URL)
        .put("/api/contest/2/problem/2022103")
        .set("Accept", "application/json")
        .send(updateProblem3Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Problem does not exist");
    });
  });
});
