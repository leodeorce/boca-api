import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";

import { URL } from "../../utils/URL";

import { Site } from "../../../src/entities/Site";

import { getToken } from "../../utils/common";

import createSite1Pass from "../../entities/Site/Pass/createSite1.json";
import createSite3Pass from "../../entities/Site/Pass/createSite3.json";
import updateSite1Pass from "../../entities/Site/Pass/updateSite1.json";
import updateSite3Pass from "../../entities/Site/Pass/updateSite3.json";

import updateSite3Fail from "../../entities/Site/Fail/updateSite3.json";
import updateSite4Fail from "../../entities/Site/Fail/updateSite4.json";

describe("Modifica os sites criados anteriormente", () => {
  let site1: Site;
  let site3: Site;
  let systemToken: string;

  it('Faz login no User "system"', async () => {
    systemToken = await getToken(
      "boca",
      "v512nj18986j8t9u1puqa2p9mh",
      "system"
    );
  });

  it("Resgata os sites a serem modificados", async () => {
    const all = await request(URL)
      .get("/api/contest/2/site")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${systemToken}`);

    expect(all.statusCode).to.equal(200);
    expect(all.headers["content-type"]).to.contain("application/json");
    expect(all.body).to.be.an("array");

    site1 = all.body.find((site: Site) => site.sitenumber === 1);
    site3 = all.body.find((site: Site) => site.sitenumber === 3);
  });

  describe("Fluxo positivo", () => {
    it('Modifica a duração do Site 1 em "Contest Beta"', async () => {
      expect(site1).to.deep.include(createSite1Pass);
      expect(site1.sitenumber).to.deep.equal(1);

      const response = await request(URL)
        .put("/api/contest/2/site/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
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
        .put("/api/contest/2/site/3")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(updateSite3Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("sitenumber");
      expect(response.body["sitenumber"]).to.equal(3);
      expect(response.body).to.have.own.property("sitepermitlogins");
      expect(response.body["sitepermitlogins"]).to.equal(
        updateSite3Pass.sitepermitlogins
      );
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta modificar a duração do Site 3 para um valor inválido", async () => {
      const response = await request(URL)
        .put("/api/contest/2/site/3")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)
        .send(updateSite3Fail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include(
        "siteduration must be greater than zero"
      );
    });

    it("Tenta modificar um site que não existe", async () => {
      const response = await request(URL)
        .put("/api/contest/2/site/4")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`)

        .send(updateSite4Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Site does not exist");
    });
  });
});
