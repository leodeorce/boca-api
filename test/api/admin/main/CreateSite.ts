import { expect } from "chai";
import request from "supertest";
import {
  createNewSitePass,
  createSite3Pass,
  createSite4Fail,
  createSite5Fail,
} from "../../../entities/Site";
import { URL } from "../../URL";

/**
 *  - Contest Beta deve existir ainda
 */

describe("Criação de um site", () => {
  describe("Fluxo positivo", () => {
    it('Cria um novo site para o "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/site")
        .set("Accept", "application/json")
        .send(createNewSitePass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("sitenumber");
      expect(response.body["sitenumber"]).to.equal(1); // TODO Alterar para 2 quando o contest estiver criando o site automaticamente
      expect(response.body).to.deep.include(createNewSitePass);
    });

    it('Cria outro site para o "Contest Beta" com valores diferentes', async () => {
      const response = await request(URL)
        .post("/api/contest/2/site")
        .set("Accept", "application/json")
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
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("sitenumber");
      expect(response.body["sitenumber"]).to.equal(1);
      expect(response.body).to.deep.include(createNewSitePass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar um site para um contest que não existe", async () => {
      const response = await request(URL)
        .post("/api/contest/3/site")
        .set("Accept", "application/json")
        .send(createSite4Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Contest does not exist");
    });

    it("Tenta criar um site de nome inválido", async () => {
      const response = await request(URL)
        .post("/api/contest/2/site")
        .set("Accept", "application/json")
        .send(createSite5Fail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Site name must be specified");
    });

    it('Tenta resgatar um site que não existe', async () => {
      const response = await request(URL)
        .get("/api/contest/2/site/4")
        .set("Accept", "application/json")
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Site does not exist");
    });
  });
});
