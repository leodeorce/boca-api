import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";

import { Lang } from "../../../src/entities/Lang";
import {
  createLang1Pass,
  createLang2Pass,
  createLang3Pass,
  patchLang2Fail,
  patchLang2Pass,
  patchLang4Fail,
  updateLang1Fail,
  updateLang1Pass,
} from "../../entities/Lang";
import { URL } from "../../utils/URL";

describe("Modifica as linguagens criadas anteriormente", () => {
  let lang1: Lang;
  let lang2: Lang;
  let lang3: Lang;

  it("Resgata as linguagens a serem modificadas", async () => {
    const all = await request(URL)
      .get("/api/contest/2/language")
      .set("Accept", "application/json");
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
        .send(updateLang1Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("langnumber");
      expect(response.body["langnumber"]).to.equal(1);
      expect(response.body).to.deep.include(updateLang1Pass);
    });

    it('Modifica o nome da linguagem 2 em "Contest Beta"', async () => {
      const response = await request(URL)
        .patch("/api/contest/2/language/2")
        .set("Accept", "application/json")
        .send(patchLang2Pass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("langnumber");
      expect(response.body["langnumber"]).to.equal(2);
      expect(response.body).to.have.own.property("langname");
      expect(response.body["langname"]).to.equal(patchLang2Pass.langname);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta modificar o nome da linguagem 1 para um valor inválido", async () => {
      const response = await request(URL)
        .put("/api/contest/2/language/1")
        .set("Accept", "application/json")
        .send(updateLang1Fail);
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Missing properties");
    });

    it("Tenta modificar o contest da linguagem 2", async () => {
      const response = await request(URL)
        .patch("/api/contest/2/language/2")
        .set("Accept", "application/json")
        .send(patchLang2Fail);
      expect(response.statusCode).to.equal(200); // TODO Modificar para 400
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("langnumber");
      expect(response.body["langnumber"]).to.equal(2);
      expect(response.body).to.have.own.property("contestnumber");
      expect(response.body["contestnumber"]).to.not.equal(
        patchLang2Fail.contestnumber
      );
    });

    it("Tenta modificar uma linguagem que não existe", async () => {
      const response = await request(URL)
        .put("/api/contest/2/language/4")
        .set("Accept", "application/json")
        .send(patchLang4Fail);
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Language does not exist");
    });
  });
});
