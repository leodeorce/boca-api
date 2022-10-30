import { expect } from "chai";
import request from "supertest";
import { Site } from "../../../../src/entities/Site";
import { updateSite1Pass } from "../../../entities/Site";
import { URL } from "../../URL";

describe("Remoção de um site", () => {
  describe("Fluxo positivo", () => {
    it('Deleta o Site 3 do "Contest Beta"', async () => {
      const response = await request(URL)
        .delete("/api/contest/2/site/3")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(204);
      expect(response.headers).to.not.have.own.property("content-type");
      expect(response.body).to.be.empty;
    });

    it("Resgata todos os sites, mas o Site 3 foi deletado", async () => {
      const all = await request(URL)
        .get("/api/contest/2/site")
        .set("Accept", "application/json");
      expect(all.statusCode).to.equal(200);
      expect(all.headers["content-type"]).to.contain("application/json");
      expect(all.body).to.be.an("array");

      // TODO Trocar para site2 quando contest estiver criando o primeiro site automaticamente
      const site1 = all.body.find((site: Site) => site.sitenumber === 1);
      const site3 = all.body.find((site: Site) => site.sitenumber === 3);

      expect(site3).to.be.undefined;
      expect(site1).to.be.an("object");
      expect(site1).to.have.own.property("sitenumber");
      expect(site1).to.deep.include(updateSite1Pass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta resgatar o Site 3 deletado", async () => {
      const response = await request(URL)
        .get("/api/contest/2/site/3")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Site does not exist");
    });

    it("Tenta deletar novamente o Site 3", async () => {
      const response = await request(URL)
        .delete("/api/contest/2/site/3")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Site does not exist");
    });

    it("Tenta deletar o Site 1 de um contest inexistente", async () => {
      const response = await request(URL)
        .delete("/api/contest/3/site/1")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Contest does not exist");
    });
  });
});
