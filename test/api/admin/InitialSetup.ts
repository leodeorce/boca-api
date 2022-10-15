import { expect } from "chai";
import request from "supertest";
import {
  createContestPass1,
  createContestPass2,
  createContestFail1,
  createContestFail2,
  createContestFail3,
} from "../../entities/Contest";
import { URL } from "../URL";

describe("Criação de um contest", () => {
  describe("Fluxo positivo", () => {
    it("Cria um contest (conjunto de valores aceitáveis)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContestPass1);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(1);
    });

    it("Cria um segundo contest (conjunto diferente de valores aceitáveis)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContestPass2);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(2);
    });
  });

  describe("Fluxo negativo", () => {
    it("Falha ao criar contest (Nome já existe)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContestFail1);
      expect(response.statusCode).to.equal(409);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Contest name already exists");
    });

    it("Falha ao criar contest (duração inválida)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContestFail2);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Duration must be a non-zero positive integer");
    });

    it("Falha ao criar contest (propriedas obrigatórias faltando)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContestFail3);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Missing properties");
    });
  });
});
