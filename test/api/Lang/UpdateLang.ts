import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";

import { Lang } from "../../../src/entities/Lang";

import { URL } from "../../utils/URL";

import { getToken } from "../../utils/common";

import createLang1Pass from "../../entities/Lang/Pass/createLang1.json";
import createLang2Pass from "../../entities/Lang/Pass/createLang2.json";
import createLang3Pass from "../../entities/Lang/Pass/createLang3.json";
import updateLang1Pass from "../../entities/Lang/Pass/updateLang1.json";
import updateLang2Pass from "../../entities/Lang/Pass/updateLang2.json";

import updateLang1Fail from "../../entities/Lang/Fail/updateLang1.json";
import updateLang4Fail from "../../entities/Lang/Fail/updateLang4.json";

describe("Modifica as linguagens criadas anteriormente", () => {
  let lang1: Lang;
  let lang2: Lang;
  let lang3: Lang;
  let adminToken: string;

  it('Faz login no User "admin"', async () => {
    adminToken = await getToken("boca", "v512nj18986j8t9u1puqa2p9mh", "admin");
  });

  it("Resgata as linguagens a serem modificadas", async () => {
    const all = await request(URL)
      .get("/api/contest/2/language")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${adminToken}`);

    expect(all.statusCode).to.equal(200);
    expect(all.headers["content-type"]).to.contain("application/json");
    expect(all.body).to.be.an("array");

    lang1 = all.body.find((lang: Lang) => lang.langnumber === 1);
    lang2 = all.body.find((lang: Lang) => lang.langnumber === 2);
    lang3 = all.body.find((lang: Lang) => lang.langnumber === 3);

    expect(lang1).to.deep.include(createLang1Pass);
    expect(lang1.langnumber).to.deep.equal(1);
    expect(lang2).to.deep.include(createLang2Pass);
    expect(lang2.langnumber).to.deep.equal(2);
    expect(lang3).to.deep.include(createLang3Pass);
    expect(lang3.langnumber).to.deep.equal(3);
  });

  describe("Fluxo positivo", () => {
    it('Modifica o nome da linguagem 1 em "Contest Beta"', async () => {
      const response = await request(URL)
        .put("/api/contest/2/language/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(updateLang1Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("langnumber");
      expect(response.body["langnumber"]).to.equal(1);
      expect(response.body).to.deep.include(updateLang1Pass);
    });

    it('Modifica o nome da linguagem 2 em "Contest Beta"', async () => {
      const response = await request(URL)
        .put("/api/contest/2/language/2")
        .set("Authorization", `Token ${adminToken}`)
        .set("Accept", "application/json")
        .send(updateLang2Pass);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("langnumber");
      expect(response.body["langnumber"]).to.equal(2);
      expect(response.body).to.have.own.property("langname");
      expect(response.body["langname"]).to.equal(updateLang2Pass.langname);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta modificar o nome da linguagem 1 com propriedades obrigatórias faltando", async () => {
      const response = await request(URL)
        .put("/api/contest/2/language/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(updateLang1Fail);

      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Missing");
    });

    it("Tenta modificar uma linguagem que não existe", async () => {
      const response = await request(URL)
        .put("/api/contest/2/language/4")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(updateLang4Fail);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Language does not exist");
    });
  });
});
