import { expect } from "chai";
import request from "supertest";
import {
  createAlphaPass,
  createBetaPass,
  createAlphaFail,
  createCharlieFail,
  createDeltaFail,
} from "../../entities/Contest";
import { URL } from "../URL";

describe("Criação de um contest", () => {
  describe("Fluxo positivo", () => {
    it("Cria um contest (conjunto de valores aceitáveis)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createAlphaPass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(1);
      expect(response.body).to.deep.include(createAlphaPass);
    });

    it("Cria um segundo contest (conjunto diferente de valores aceitáveis)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createBetaPass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(2);
      expect(response.body).to.deep.include(createBetaPass);
    });

    it('Resgata o "Contest Alpha" criado anteriormente', async () => {
      const response = await request(URL)
        .get("/api/contests/1")
        .set("Accept", "application/json")
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.equal(1);
      expect(response.body).to.deep.include(createAlphaPass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar um contest com um nome já existente", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createAlphaFail);
      expect(response.statusCode).to.equal(409);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Contest name already exists");
    });

    it("Tenta criar um contest de duração inválida", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createCharlieFail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("contestduration must be greater than zero");
    });

    it("Tenta criar um contest sem especificar alguma propriedade obrigatória", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(createDeltaFail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Missing properties");
    });

    it('Tenta resgatar um contest que não existe', async () => {
      const response = await request(URL)
        .get("/api/contests/3")
        .set("Accept", "application/json")
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Contest does not exist");
    });
  });
});
