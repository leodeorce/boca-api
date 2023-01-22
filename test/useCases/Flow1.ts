import { expect } from "chai";
import request from "supertest";
import { createHash } from "crypto";

import { URL } from "../utils/URL";

import { getToken } from "../utils/common";

import createContest1 from "../entities/Contest/UseCases/createContest1.json";
import updateContest1 from "../entities/Contest/UseCases/updateContest1.json";

import createSite1 from "../entities/Site/UseCases/createSite1.json";

import createUserAdmin from "../entities/User/UseCases/createUserAdmin.json";
import createUserTime1 from "../entities/User/UseCases/createUserTime1.json";

import createLangC from "../entities/Lang/UseCases/createLangC.json";
import createLangJava from "../entities/Lang/UseCases/createLangJava.json";

import createAnswer0 from "../entities/Answer/UseCases/createAnswer0.json";
import createAnswer1 from "../entities/Answer/UseCases/createAnswer1.json";
import createAnswer2 from "../entities/Answer/UseCases/createAnswer2.json";
import createAnswer3 from "../entities/Answer/UseCases/createAnswer3.json";
import createAnswer4 from "../entities/Answer/UseCases/createAnswer4.json";
import createAnswer5 from "../entities/Answer/UseCases/createAnswer5.json";
import createAnswer6 from "../entities/Answer/UseCases/createAnswer6.json";
import createAnswer7 from "../entities/Answer/UseCases/createAnswer7.json";
import createAnswer8 from "../entities/Answer/UseCases/createAnswer8.json";

import createProblem1 from "../entities/Problem/UseCases/createProblem1.json";
import createProblem2 from "../entities/Problem/UseCases/createProblem2.json";

import createRun1 from "../entities/Run/UseCases/createRun1.json";

describe("Fluxo 1", () => {
  const salt = "v512nj18986j8t9u1puqa2p9mh";
  let systemToken: string;
  let adminToken: string;
  let teamToken: string;

  it('Faz login no User "system"', async () => {
    systemToken = await getToken("boca", salt, "system");
  });

  it("Cria o Contest 1", async () => {
    createContest1.conteststartdate = Math.floor(Date.now() / 1000) + 3600;

    const response = await request(URL)
      .post("/api/contest")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${systemToken}`)
      .send(createContest1);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.have.own.property("contestnumber");
    expect(response.body["contestnumber"]).to.equal(1);
    expect(response.body).to.deep.include(createContest1);
  });

  it("Cria um Site para o Contest 1", async () => {
    const response = await request(URL)
      .post("/api/contest/1/site")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${systemToken}`)
      .send(createSite1);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.have.own.property("sitenumber");
    expect(response.body["sitenumber"]).to.equal(1);
    expect(response.body).to.deep.include(createSite1);
  });

  it("Cria um User administrador para o Contest 1", async () => {
    const password = createHash("sha256").update("boca").digest("hex");
    createUserAdmin.userpassword = password;

    const response = await request(URL)
      .post("/api/contest/1/site/1/user")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${systemToken}`)
      .send(createUserAdmin);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.have.own.property("usernumber");
    expect(response.body["usernumber"]).to.equal(createUserAdmin.usernumber);
    expect(response.body).to.deep.include(createUserAdmin);
  });

  it("Desativa o Fake Contest", async () => {
    let response = await request(URL)
      .get("/api/contest/0")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${systemToken}`);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.have.own.property("contestnumber");
    expect(response.body["contestnumber"]).to.equal(0);

    const fakeContest = response.body;
    fakeContest["contestactive"] = false;
    fakeContest["contestduration"] = 1;

    response = await request(URL)
      .put("/api/contest/0")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${systemToken}`)
      .send(fakeContest);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.have.own.property("contestnumber");
    expect(response.body["contestnumber"]).to.equal(0);
    expect(response.body).to.deep.include(fakeContest);
  });

  it("Ativa o Contest 1", async () => {
    updateContest1.conteststartdate = createContest1.conteststartdate;

    const response = await request(URL)
      .put("/api/contest/1")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${systemToken}`)
      .send(updateContest1);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.have.own.property("contestnumber");
    expect(response.body["contestnumber"]).to.equal(1);
    expect(response.body).to.deep.include(updateContest1);
  });

  it("Faz login no User administrador do Contest ativo (Contest 1)", async () => {
    adminToken = await getToken("boca", salt, "admin");
  });

  it("Cria as linguagem C e Java para o Contest 1", async () => {
    let response = await request(URL)
      .post("/api/contest/1/language")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${adminToken}`)
      .send(createLangC);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.deep.include(createLangC);

    response = await request(URL)
      .post("/api/contest/1/language")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${adminToken}`)
      .send(createLangJava);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.deep.include(createLangJava);
  });

  it("Cria as Answers padrão para o Contest 1", async () => {
    const answers = [
      createAnswer0,
      createAnswer1,
      createAnswer2,
      createAnswer3,
      createAnswer4,
      createAnswer5,
      createAnswer6,
      createAnswer7,
      createAnswer8,
    ];

    for (const answer of answers) {
      const response = await request(URL)
        .post("/api/contest/1/answer")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`)
        .send(answer);

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.deep.include(answer);
    }
  });

  it("Cria os problemas L1_1 e L1_2 no Contest 1", async () => {
    let response = await request(URL)
      .post("/api/contest/1/problem")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${adminToken}`)
      .send(createProblem1);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.deep.include(createProblem1);

    response = await request(URL)
      .put(`/api/contest/1/problem/${createProblem1.problemnumber}/file`)
      .attach("probleminputfile", "test/files/L1_1.zip")
      .set("Authorization", `Token ${adminToken}`);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.deep.include(createProblem1);

    response = await request(URL)
      .post("/api/contest/1/problem")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${adminToken}`)
      .send(createProblem2);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.deep.include(createProblem2);

    response = await request(URL)
      .put(`/api/contest/1/problem/${createProblem2.problemnumber}/file`)
      .attach("probleminputfile", "test/files/L1_2.zip")
      .set("Authorization", `Token ${adminToken}`);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.deep.include(createProblem2);
  });

  it("Cria um User Time 1 para o Contest 1", async () => {
    const password = createHash("sha256").update("boca").digest("hex");
    createUserTime1.userpassword = password;

    const response = await request(URL)
      .post("/api/contest/1/site/1/user")
      .set("Accept", "application/json")
      .set("Authorization", `Token ${adminToken}`)
      .send(createUserTime1);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.have.own.property("usernumber");
    expect(response.body["usernumber"]).to.equal(createUserTime1.usernumber);
    expect(response.body).to.deep.include({
      ...createUserTime1,
      userpassword: "!" + createUserTime1.userpassword,
    });
  });

  it("Faz login no User Time 1", async () => {
    teamToken = await getToken("boca", salt, "time1");
  });

  it("Time 1 cria uma Run no problema L1_2 no Contest 1", async () => {
    createRun1.rundate = Math.floor(Date.now() / 1000) + 7200;

    const response = await request(URL)
      .post("/api/contest/1/problem/2022102/run")
      .attach("runfile", "test/files/Time_1_L1_2.c")
      .field("data", JSON.stringify(createRun1))
      .set("Authorization", `Token ${teamToken}`);

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");
    expect(response.body).to.deep.include(createRun1);
  });
});
