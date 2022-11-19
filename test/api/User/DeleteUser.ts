import { expect } from "chai";
import request from "supertest";
import { User } from "../../../src/entities/User";
import { URL } from "../../utils/URL";

describe("Remoção de um user", () => {
  describe("Fluxo positivo", () => {
    it('Deleta o Time 1 do "Site 1" em "Contest Beta"', async () => {
      const response = await request(URL)
        .delete("/api/contest/2/site/1/user/1")
        .set("Accept", "application/json");
      expect(response.statusCode).to.equal(204);
      expect(response.headers).to.not.have.own.property("content-type");
      expect(response.body).to.be.empty;
    });

    it("Resgata todos os usuários do Site 1, mas o Time 1 foi deletado", async () => {
      const all = await request(URL)
        .get("/api/contest/2/site/1/user")
        .set("Accept", "application/json");
      expect(all.statusCode).to.equal(200);
      expect(all.headers["content-type"]).to.contain("application/json");
      expect(all.body).to.be.an("array");

      const time1 = all.body.find((user: User) => user.usernumber === 1);
      const time3 = all.body.find((user: User) => user.usernumber === 3);

      expect(time1).to.be.undefined;
      expect(time3).to.be.an("object");
      expect(time3).to.have.own.property("usernumber");
      // expect(time3).to.deep.include(updateUser3Pass); // TODO Atualizar
    });

    describe("Fluxo negativo", () => {
      it("Tenta resgatar o Time 1 deletado", async () => {
        const response = await request(URL)
          .get("/api/contest/2/site/1/user/1")
          .set("Accept", "application/json");
        expect(response.statusCode).to.equal(404);
        expect(response.headers["content-type"]).to.contain("application/json");
        expect(response.body).to.have.own.property("error");
        expect(response.body["error"]).to.include("User does not exist");
      });
  
      it("Tenta deletar novamente o Time 1", async () => {
        const response = await request(URL)
          .delete("/api/contest/2/site/1/user/1")
          .set("Accept", "application/json");
        expect(response.statusCode).to.equal(404);
        expect(response.headers["content-type"]).to.contain("application/json");
        expect(response.body).to.have.own.property("error");
        expect(response.body["error"]).to.include("User does not exist");
      });
  
      it("Tenta deletar o Time 1 de um contest inexistente", async () => {
        const response = await request(URL)
          .delete("/api/contest/3/site/1/user/1")
          .set("Accept", "application/json");
        expect(response.statusCode).to.equal(404);
        expect(response.headers["content-type"]).to.contain("application/json");
        expect(response.body).to.have.own.property("error");
        expect(response.body["error"]).to.include("Contest does not exist");
      });
    });
  });
});
