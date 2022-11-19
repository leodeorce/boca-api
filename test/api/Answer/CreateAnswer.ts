import { expect } from "chai";
import request from "supertest";
import {
  createAnswer0Pass,
  createAnswer1Pass,
  createAnswer3Fail,
  createAnswer4Fail,
  createAnswer2Pass,
} from "../../entities/Answer";
import { URL } from "../../utils/URL";

/**
 *  - Contest Beta deve existir
 */

describe("Criação de uma answer", () => {
  describe("Fluxo positivo", () => {
    it('Cria a answer "Not answered yet" para o "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/answer")
        .set("Accept", "application/json")
        .send(createAnswer0Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createAnswer0Pass);
    });

    it('Cria a answer "YES" para o "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/answer")
        .set("Accept", "application/json")
        .send(createAnswer1Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createAnswer1Pass);
    });

    it('Cria a answer "NO - Compilation error" para o "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/answer")
        .set("Accept", "application/json")
        .send(createAnswer2Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createAnswer2Pass);
    });

    it("Resgata a primeira das duas answers criadas anteriormente", async () => {
      const response = await request(URL)
        .get("/api/contest/2/answer/0")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("answernumber");
      expect(response.body["answernumber"]).to.equal(0);
      expect(response.body).to.deep.include(createAnswer0Pass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar uma answer para um contest que não existe", async () => {
      const response = await request(URL)
        .post("/api/contest/3/answer")
        .set("Accept", "application/json")
        .send(createAnswer3Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Contest does not exist");
    });

    it("Tenta criar uma answer de ID inválido", async () => {
      const response = await request(URL)
        .post("/api/contest/2/answer")
        .set("Accept", "application/json")
        .send(createAnswer4Fail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include(
        "answernumber must not be less than 0"
      );
    });

    it("Tenta resgatar uma answer que não existe", async () => {
      const response = await request(URL)
        .get("/api/contest/2/answer/4")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Answer does not exist");
    });
  });
});
