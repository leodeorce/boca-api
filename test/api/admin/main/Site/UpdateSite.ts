import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";
import { Site } from "../../../../../src/entities/Site";
import {
  createNewSitePass,
  createSite3Pass,
  patchSite3Fail,
  patchSite3Pass,
  patchSite4Fail,
  updateSite1Pass,
  updateSite3Fail,
} from "../../../../entities/Site";
import { URL } from "../../../URL";

describe("Modifica os sites criados anteriormente", () => {
  let site1: Site; // TODO Trocar para site2 quando contest estiver criando o primeiro site automaticamente
  let site3: Site;

  it("Resgata os sites a serem modificados", async () => {
    const all = await request(URL)
      .get("/api/contest/2/site")
      .set("Accept", "application/json");
    expect(all.statusCode).to.equal(200);
    expect(all.headers["content-type"]).to.contain("application/json");
    expect(all.body).to.be.an("array");

    // TODO Trocar para site2 quando contest estiver criando o primeiro site automaticamente
    site1 = all.body.find((site: Site) => site.sitenumber === 1);
    site3 = all.body.find((site: Site) => site.sitenumber === 3);
  });

  describe("Fluxo positivo", () => {
    it('Modifica a duração do Site 1 em "Contest Beta"', async () => {
      expect(site1).to.deep.include(createNewSitePass);
      expect(site1.sitenumber).to.deep.equal(1); // TODO trocar para 2

      const response = await request(URL)
        .put("/api/contest/2/site/1") // TODO trocar para 2
        .set("Accept", "application/json")
        .send(updateSite1Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("sitenumber");
      expect(response.body["sitenumber"]).to.equal(1);
      expect(response.body).to.deep.include(updateSite1Pass);
    });

    it('Modifica permissão de logins no Site 3 em "Contest Beta"', async () => {
      expect(site3).to.deep.include(createSite3Pass);
      expect(site3.sitenumber).to.deep.equal(3);

      const response = await request(URL)
        .patch("/api/contest/2/site/3")
        .set("Accept", "application/json")
        .send(patchSite3Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("sitenumber");
      expect(response.body["sitenumber"]).to.equal(3);
      expect(response.body).to.have.own.property("sitepermitlogins");
      expect(response.body["sitepermitlogins"]).to.equal(
        patchSite3Pass.sitepermitlogins
      );
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta modificar a duração do Site 3 para um valor inválido", async () => {
      const response = await request(URL)
        .put("/api/contest/2/site/3")
        .set("Accept", "application/json")
        .send(updateSite3Fail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include(
        "siteduration must be greater than zero"
      );
    });

    it('Tenta modificar o contest ao qual o Site 3 do "Contest Beta" pertence', async () => {
      const response = await request(URL)
        .patch("/api/contest/2/site/3")
        .set("Accept", "application/json")
        .send(patchSite3Fail);
      expect(response.statusCode).to.equal(200);  // TODO Modificar para 400
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("sitenumber");
      expect(response.body["sitenumber"]).to.equal(3);
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.not.equal(
        patchSite3Fail.contestnumber
      );
    });

    it("Tenta modificar um site que não existe", async () => {
      const response = await request(URL)
        .put(`/api/contest/2/site/4`)
        .set("Accept", "application/json")
        .send(patchSite4Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Site does not exist");
    });
  });
});
