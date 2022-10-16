import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";
import { updateContestPass1 } from "../../entities/Contest";
import { URL } from "../URL";

describe("Modifica os contests criados anteriormente", () => {
  describe("Ativa o primeiro contest", () => {
    describe("Fluxo positivo", () => {
      it("Ativa com sucesso o contest de ID 1 (Contest Alpha)", async () => {
        const response = await request(URL)
          .put("/api/contests/1")
          .set("Accept", "application/json")
          .send(updateContestPass1);
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.contain("application/json");
        expect(response.body).to.have.own.property("contestnumber");
        expect(response.body["contestnumber"]).to.equal(1);
        expect(response.body).to.have.own.property("contestactive");
        expect(response.body["contestactive"]).to.equal(true);
      });
    });
  });
});
