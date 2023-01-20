import { expect } from "chai";
import { createHash } from "crypto";
import request from "supertest";
import { Contest } from "../../../src/entities/Contest";
import { URL } from "../../utils/URL";

describe("Remoção de um contest", () => {
  let systemToken: string;

  it('Resgata um token de autenticação para "system"', async () => {
    const salt = "v512nj18986j8t9u1puqa2p9mh";
    const password = createHash("sha256").update("boca").digest("hex");
    const hash = createHash("sha256")
      .update(password + salt)
      .digest("hex");

    const response = await request(URL)
      .get("/api/token")
      .query({
        name: "system",
        password: hash,
      })
      .set("Accept", "application/json");

    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.contain("application/json");

    const { accessToken } = response.body;
    const count = accessToken.match(/\./g)?.length;
    expect(count).to.equal(2);

    systemToken = accessToken;
  });

  describe("Fluxo positivo", () => {
    it('Deleta o "Contest Alpha"', async () => {
      const response = await request(URL)
        .delete("/api/contest/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(response.statusCode).to.equal(204);
      expect(response.headers).to.not.have.own.property("content-type");
      expect(response.body).to.be.empty;
    });

    it("Resgata todos os contests, mas Alpha foi deletado", async () => {
      const all = await request(URL)
        .get("/api/contest")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(all.statusCode).to.equal(200);
      expect(all.headers["content-type"]).to.contain("application/json");
      expect(all.body).to.be.an("array");

      const contestAlpha = all.body.find((contest: Contest) =>
        contest.contestname.includes("Contest Alpha")
      );

      const contestBeta = all.body.find((contest: Contest) =>
        contest.contestname.includes("Contest Beta")
      );

      expect(contestAlpha).to.be.undefined;
      expect(contestBeta).to.be.an("object");
      expect(contestBeta).to.have.own.property("contestnumber");
      expect(contestBeta.contestnumber).to.deep.equal(2);
    });
  });

  describe("Fluxo negativo", () => {
    it('Tenta resgatar "Contest Alpha"', async () => {
      const response = await request(URL)
        .get("/api/contest/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Contest does not exist");
    });

    it('Tenta deletar novamente o "Contest Alpha"', async () => {
      const response = await request(URL)
        .delete("/api/contest/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${systemToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Contest does not exist");
    });
  });
});
