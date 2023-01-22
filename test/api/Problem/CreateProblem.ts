import { expect } from "chai";
import request from "supertest";

import { URL } from "../../utils/URL";

import { getToken } from "../../utils/common";

import createProblem1Pass from "../../entities/Problem/Pass/createProblem1.json";
import createProblem2Pass from "../../entities/Problem/Pass/createProblem2.json";

import createProblem3Fail from "../../entities/Problem/Fail/createProblem3.json";
import createProblem4Fail from "../../entities/Problem/Fail/createProblem4.json";
import createProblem5Fail from "../../entities/Problem/Fail/createProblem5.json";
import createProblem6Fail from "../../entities/Problem/Fail/createProblem6.json";

describe("Criação de um problema", () => {
  let adminToken: string;

  it('Faz login no User "admin"', async () => {
    adminToken = await getToken("boca", "v512nj18986j8t9u1puqa2p9mh", "admin");
  });

  describe("Fluxo positivo", () => {
    it('Cria o problema "L1_1" no "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(createProblem1Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createProblem1Pass);
    });

    it('Adiciona arquivo L1_1.zip ao problema "L1_1"', async () => {
      const response = await request(URL)
        .put(`/api/contest/2/problem/${createProblem1Pass.problemnumber}/file`)
        .attach("probleminputfile", "test/files/L1_1.zip")
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createProblem1Pass);
    });

    it('Cria o problema "L1_2" no "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(createProblem2Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createProblem2Pass);
    });

    it('Adiciona arquivo L1_2.zip ao problema "L1_2"', async () => {
      const response = await request(URL)
        .put(`/api/contest/2/problem/${createProblem2Pass.problemnumber}/file`)
        .attach("probleminputfile", "test/files/L1_2.zip")
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createProblem2Pass);
    });

    it("Resgata o primeiro dos dois problemas criados anteriormente", async () => {
      const response = await request(URL)
        .get(`/api/contest/2/problem/${createProblem1Pass.problemnumber}`)
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("problemnumber");
      expect(response.body["problemnumber"]).to.equal(
        createProblem1Pass.problemnumber
      );
      expect(response.body).to.deep.include(createProblem1Pass);
    });

    it("Resgata o arquivo do segundo problema criado anteriormente", async () => {
      const response = await request(URL)
        .get(`/api/contest/2/problem/${createProblem2Pass.problemnumber}/file`)
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/zip");
      expect(response.headers["content-disposition"]).to.contain(
        'filename="L1_2.zip"'
      );
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar um problema para um contest que não existe", async () => {
      const response = await request(URL)
        .post("/api/contest/3/problem")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(createProblem3Fail);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Contest does not exist");
    });

    it("Tenta criar um problema com uma propriedade faltando", async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(createProblem4Fail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Missing");
    });

    it("Tenta criar um problema com ID já existente", async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(createProblem5Fail);

      expect(response.statusCode).to.equal(409);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("already in use");
    });

    it("Tenta resgatar um problema que não existe", async () => {
      const response = await request(URL)
        .get("/api/contest/2/problem/2022105")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Problem does not exist");
    });

    it("Tenta criar um problema com uma propriedade de tipo errado", async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(createProblem6Fail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("problemnumber");
    });
  });
});
