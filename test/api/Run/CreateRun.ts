import { expect } from "chai";
import request from "supertest";

import { URL } from "../../utils/URL";

import createRun1Pass from "../../entities/Run/Pass/createRun1.json";
import createRun2Pass from "../../entities/Run/Pass/createRun2.json";
import createRun3Pass from "../../entities/Run/Pass/createRun3.json";

import createRun4Fail from "../../entities/Run/Fail/createRun4.json";
import createRun5Fail from "../../entities/Run/Fail/createRun5.json";
import createRun6Fail from "../../entities/Run/Fail/createRun6.json";

describe("Criação de uma run", () => {
  describe("Fluxo positivo", () => {
    it('Cria a run 1 no problema "L1_2" em "Contest Beta" para o "Time 3"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem/2022102/run")
        .attach("runfile", "test/files/Time_1_L1_2.c")
        .field("data", JSON.stringify(createRun1Pass));
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createRun1Pass);
    });

    it('Cria a run 2 no problema "L1_2" em "Contest Beta" para o "Time 3"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem/2022102/run")
        .attach("runfile", "test/files/Time_1_L1_2_v2.java")
        .field("data", JSON.stringify(createRun2Pass));
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createRun2Pass);
    });

    it('Cria a run 3 no problema "L1_2" em "Contest Beta" para o "Time 3"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem/2022102/run")
        .attach("runfile", "test/files/Time_1_L1_2_v3.java")
        .field("data", JSON.stringify(createRun3Pass));
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(createRun3Pass);
    });

    it("Resgata os dados da primeira das três runs criadas anteriormente", async () => {
      const response = await request(URL)
        .get("/api/contest/2/problem/2022102/run/1")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("runnumber");
      expect(response.body["runnumber"]).to.equal(1);
      expect(response.body).to.deep.include(createRun1Pass);
    });

    it("Resgata o arquivo da segunda run criada anteriormente", async () => {
      const response = await request(URL).get(
        "/api/contest/2/problem/2022102/run/2/file"
      );
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("text/x-java-source");
      expect(response.headers["content-length"]).to.contain("117");
      expect(response.headers["content-disposition"]).to.contain(
        'filename="Time_1_L1_2_v2.java"'
      );
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta criar uma run para um contest que não existe", async () => {
      const response = await request(URL)
        .post("/api/contest/3/problem/2022102/run")
        .attach("runfile", "test/files/Time_1_L1_2_v4.c")
        .field("data", JSON.stringify(createRun4Fail));
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Contest does not exist");
    });

    it("Tenta criar uma run com uma propriedade faltando", async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem/2022102/run")
        .attach("runfile", "test/files/Time_1_L1_2_v5.java")
        .field("data", JSON.stringify(createRun5Fail));
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Missing");
    });

    it("Tenta resgatar uma run que não existe", async () => {
      const response = await request(URL)
        .get("/api/contest/2/problem/2022102/run/4")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Run does not exist");
    });

    it("Tenta criar uma run com uma propriedade de tipo errado", async () => {
      const response = await request(URL)
        .post("/api/contest/2/problem/2022102/run")
        .attach("runfile", "test/files/Time_1_L1_2_v6.c")
        .field("data", JSON.stringify(createRun6Fail));
      expect(response.statusCode).to.equal(400);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("runlangnumber");
    });
  });
});
