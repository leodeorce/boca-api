import { expect } from "chai";
import request from "supertest";
import { Answer } from "../../../src/entities/Answer";
import { patchAnswer1Pass, updateAnswer0Pass } from "../../entities/Answer";
import { URL } from "../../utils/URL";

describe("Remoção de uma answer", () => {
  describe("Fluxo positivo", () => {
    it('Deleta a answer 2 do "Contest Beta"', async () => {
      const response = await request(URL)
        .delete("/api/contest/2/answer/2")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(204);
      expect(response.headers).to.not.have.own.property("content-type");
      expect(response.body).to.be.empty;
    });

    it("Resgata todas as answers, mas a answer 2 foi deletada", async () => {
      const all = await request(URL)
        .get("/api/contest/2/answer")
        .set("Accept", "application/json");
      expect(all.statusCode).to.equal(200);
      expect(all.headers["content-type"]).to.contain("application/json");
      expect(all.body).to.be.an("array");

      const answer0 = all.body.find(
        (answer: Answer) => answer.answernumber === 0
      );
      const answer1 = all.body.find(
        (answer: Answer) => answer.answernumber === 1
      );
      const answer2 = all.body.find(
        (answer: Answer) => answer.answernumber === 2
      );

      expect(answer2).to.be.undefined;

      expect(answer0).to.be.an("object");
      expect(answer0).to.have.own.property("answernumber");
      expect(answer0).to.deep.include(updateAnswer0Pass);

      expect(answer1).to.be.an("object");
      expect(answer1).to.have.own.property("answernumber");
      expect(answer1).to.deep.include(patchAnswer1Pass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta resgatar a answer 2 deletada", async () => {
      const response = await request(URL)
        .get("/api/contest/2/answer/2")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Answer does not exist");
    });

    it("Tenta deletar novamente a answer 2", async () => {
      const response = await request(URL)
        .delete("/api/contest/2/answer/3")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Answer does not exist");
    });

    it("Tenta deletar a answer 0 de um contest inexistente", async () => {
      const response = await request(URL)
        .delete("/api/contest/3/answer/0")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Contest does not exist");
    });
  });
});
