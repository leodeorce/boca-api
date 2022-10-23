import { expect } from "chai";
import request from "supertest";
import { Contest } from "../../../src/entities/Contest";
import { URL } from "../URL";

describe("Remoção de um contest", () => {
  describe("Fluxo positivo", () => {
    it('Deleta o "Contest Alpha"', async () => {
      const response = await request(URL)
        .delete("/api/contests/1")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(204);
      expect(response.headers).to.not.have.own.property("content-type");
      expect(response.body).to.be.empty;
    });

    it("Resgata todos os contests, mas Alpha foi deletado", async () => {
      const all = await request(URL)
        .get("/api/contests")
        .set("Accept", "application/json");
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
        .get("/api/contests/1")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Contest does not exist");
    });

    it('Tenta deletar novamente o "Contest Alpha"', async () => {
      const response = await request(URL)
        .delete("/api/contests/1")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("error");
      expect(response.body["error"]).to.include("Contest does not exist");
    });
  });
});
