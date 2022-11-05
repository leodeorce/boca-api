import { expect } from "chai";
import request from "supertest";
import { createNewUserPass } from "../../../../entities/User";
import { URL } from "../../../URL";

describe("Cria um usuário", () => {
  describe("Fluxo positivo", () => {
    it('Cria um usuário do tipo "Team" no "Site 1" de "Contest Beta"', async () => {
      const response = await request(URL)
        .post("/api/contest/2/site/1/user")
        .set("Accept", "application/json")
        .send(createNewUserPass);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("usernumber");
      expect(response.body["usernumber"]).to.equal(1);
      expect(response.body).to.deep.include(createNewUserPass);
    });
  });
});
