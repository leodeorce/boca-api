import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";
import { Contest } from "../../../src/entities/Contest";
import {
  createContestPass1,
  createContestPass2,
  updateContestPass1,
  updateContestPass2,
} from "../../entities/Contest";
import { URL } from "../URL";

describe("Modifica os contests criados anteriormente", () => {
  describe("Ativa o primeiro contest", () => {
    describe("Fluxo positivo", () => {
      it('Ativa com sucesso o contest de nome "Contest Alpha"', async () => {
        const all = await request(URL)
          .get("/api/contests")
          .set("Accept", "application/json");

        expect(all.statusCode).to.equal(200);
        expect(all.headers["content-type"]).to.contain("application/json");
        expect(all.body).to.be.an("array");

        const contest = all.body.find(
          (contest: Contest) => contest.contestname === "Contest Alpha"
        );

        expect(contest).to.deep.include(createContestPass1);
        expect(contest.contestnumber).to.deep.equal(1);

        const response = await request(URL)
          .put(`/api/contests/1`)
          .set("Accept", "application/json")
          .send(updateContestPass1);

        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.contain("application/json");
        expect(response.body).to.have.own.property("contestnumber");
        expect(response.body["contestnumber"]).to.equal(1);
        expect(response.body).to.deep.include(updateContestPass1);
      });

      it('Modifica todas as propriedades possíveis do contest "Contest Beta"', async () => {
        const all = await request(URL)
          .get("/api/contests")
          .set("Accept", "application/json");

        expect(all.statusCode).to.equal(200);
        expect(all.headers["content-type"]).to.contain("application/json");
        expect(all.body).to.be.an("array");

        const contest = all.body.find(
          (contest: Contest) => contest.contestname === "Contest Beta"
        );

        expect(contest).to.deep.include(createContestPass2);
        expect(contest.contestnumber).to.deep.equal(2);

        const response = await request(URL)
          .put(`/api/contests/2`)
          .set("Accept", "application/json")
          .send(updateContestPass2);

        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.contain("application/json");
        expect(response.body).to.have.own.property("contestnumber");
        expect(response.body["contestnumber"]).to.equal(2);
        expect(response.body).to.deep.include(updateContestPass2);
      });
    });
  });
});
