import { expect } from "chai";
import { createHash } from "crypto";
import request from "supertest";

import { URL } from "../../utils/URL";

describe("Fluxos de login de um usuário", () => {
  describe("Fluxo positivo", () => {
    it('Faz login no User "Time 2"', async () => {
      const salt = "v512nj18986j8t9u1puqa2p9mh";
      const password = "";
      const hash = createHash("sha256")
        .update(password + salt)
        .digest("hex");

      const response = await request(URL)
        .get("/api/token")
        .query({
          name: "time2",
          password: hash,
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");

      const { accessToken } = response.body;
      const count = accessToken.match(/\./g)?.length;

      expect(count).to.equal(2);
    });

    it('Faz login no User "Time 3"', async () => {
      const salt = "v512nj18986j8t9u1puqa2p9mh";
      const password = createHash("sha256").update("boca").digest("hex");
      const hash = createHash("sha256")
        .update(password + salt)
        .digest("hex");

      const response = await request(URL)
        .get("/api/token")
        .query({
          name: "time3",
          password: hash,
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");

      const { accessToken } = response.body;
      const count = accessToken.match(/\./g)?.length;

      expect(count).to.equal(2);
    });
  });

  describe("Fluxo negativo", () => {
    it('Tenta fazer login no User "Time 1" com a senha incorreta', async () => {
      const salt = "v512nj18986j8t9u1puqa2p9mh";
      const password = createHash("sha256").update("senha").digest("hex");
      const hash = createHash("sha256")
        .update(password + salt)
        .digest("hex");

      const response = await request(URL)
        .get("/api/token")
        .query({
          name: "time3",
          password: hash,
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(401);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Wrong password");
    });

    it('Tenta fazer login no User "Time 2" que não existe', async () => {
      const salt = "v512nj18986j8t9u1puqa2p9mh";
      const password = createHash("sha256").update("boca").digest("hex");
      const hash = createHash("sha256")
        .update(password + salt)
        .digest("hex");

      const response = await request(URL)
        .get("/api/token")
        .query({
          name: "time2",
          password: hash,
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("User with username");
      expect(response.body["message"]).to.include("does not exist");
    });
  });
});
