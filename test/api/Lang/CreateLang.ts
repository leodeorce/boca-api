import { expect } from "chai";
import request from "supertest";

import { URL } from "../../utils/URL";

import createLang1Pass from "../../entities/Lang/Pass/createLang1.json";
import createLang2Pass from "../../entities/Lang/Pass/createLang2.json";
import createLang3Pass from "../../entities/Lang/Pass/createLang3.json";

import createLang4Fail from "../../entities/Lang/Fail/createLang4.json";
import createLang5Fail from "../../entities/Lang/Fail/createLang5.json";
import createLang6Fail from "../../entities/Lang/Fail/createLang6.json";

/**
 *  - Contest Beta deve existir
 */

describe("Criação de uma linguagem", () => {
  describe("Fluxo positivo", () => {
    it('Cria a linguagem "C" para o "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/language")
        .set("Accept", "application/json")
        .send(createLang1Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createLang1Pass);
    });

    it('Cria a linguagem "Java" para o "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/language")
        .set("Accept", "application/json")
        .send(createLang2Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createLang2Pass);
    });

    it('Cria a linguagem "PostgreSQL_v10" para o "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/language")
        .set("Accept", "application/json")
        .send(createLang3Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createLang3Pass);
    });

    it("Resgata a primeira das três linguagens criadas anteriormente", async () => {
      const response = await request(URL)
        .get("/api/contest/2/language/1")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("langnumber");
      expect(response.body["langnumber"]).to.equal(1);
      expect(response.body).to.deep.include(createLang1Pass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar uma linguagem para um contest que não existe", async () => {
      const response = await request(URL)
        .post("/api/contest/3/language")
        .set("Accept", "application/json")
        .send(createLang4Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Contest does not exist");
    });

    it("Tenta criar uma linguagem com propriedades faltando", async () => {
      const response = await request(URL)
        .post("/api/contest/2/language")
        .set("Accept", "application/json")
        .send(createLang5Fail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Missing properties");
    });

    it("Tenta resgatar uma linguagem que não existe", async () => {
      const response = await request(URL)
        .get("/api/contest/2/language/4")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Language does not exist");
    });

    it("Tenta criar um linguagem com uma propriedade de tipo errado", async () => {
      const response = await request(URL)
        .post("/api/contest/2/language")
        .set("Accept", "application/json")
        .send(createLang6Fail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      // expect(response.body["error"]).to.include(""); // TODO Adicionar verificação
    });
  });
});
