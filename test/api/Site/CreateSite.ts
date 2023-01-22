import { expect } from "chai";
import request from "supertest";

import { URL } from "../../utils/URL";

import { getToken } from "../../utils/common";

import createSite1Pass from "../../entities/Site/Pass/createSite1.json";
import createSite3Pass from "../../entities/Site/Pass/createSite3.json";

import createSite4Fail from "../../entities/Site/Fail/createSite4.json";
import createSite5Fail from "../../entities/Site/Fail/createSite5.json";

describe("Criação de um site", () => {
  let systemToken: string;

  it('Faz login no User "system"', async () => {
    systemToken = await getToken(
      "boca",
      "v512nj18986j8t9u1puqa2p9mh",
      "system"
    );
  });

  describe("Fluxo positivo", () => {
    it('Cria um novo site para o "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/site")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createSite1Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("sitenumber");
      expect(response.body["sitenumber"]).to.equal(1);
      expect(response.body).to.deep.include(createSite1Pass);
    });

    it('Cria outro site para o "Contest Beta" com valores diferentes', async () => {
      const response = await request(URL)
        .post("/api/contest/2/site")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createSite3Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("sitenumber");
      expect(response.body["sitenumber"]).to.equal(3);
      expect(response.body).to.deep.include(createSite3Pass);
    });

    it("Resgata o primeiro dos dois sites criados anteriormente", async () => {
      const response = await request(URL)
        .get("/api/contest/2/site/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("sitenumber");
      expect(response.body["sitenumber"]).to.equal(1);
      expect(response.body).to.deep.include(createSite1Pass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar um site para um contest que não existe", async () => {
      const response = await request(URL)
        .post("/api/contest/3/site")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createSite4Fail);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Contest does not exist");
    });

    it("Tenta criar um site de nome inválido", async () => {
      const response = await request(URL)
        .post("/api/contest/2/site")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(createSite5Fail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "sitename must be longer than"
      );
    });

    it("Tenta resgatar um site que não existe", async () => {
      const response = await request(URL)
        .get("/api/contest/2/site/4")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Site does not exist");
    });
  });
});
