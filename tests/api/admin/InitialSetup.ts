import { expect } from "chai";
import request from "supertest";
import { createContest1, createContest2, createContest3, createContest4, createContest5 } from "../../entities/Contest";
import { URL } from "../URL";

describe("Criação de um contest", () => {
  describe("Fluxo positivo", () => {
    it("Cria um contest (conjunto de valores aceitáveis)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContest1);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(1);
    });

    it("Cria um segundo contest (conjunto diferente de valores aceitáveis)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContest2);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(2);
    });
  });

  describe("Fluxo negativo", () => {
    it("Falha ao criar contest (data de início inválida)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContest3);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Start date is invalid");
    });

    it("Falha ao criar contest (duração inválida)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContest4);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Duration");
    });

    it("Falha ao criar contest (argumentos obrigatórios faltando)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createContest5);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Missing required arguments");
    });
  });
});
