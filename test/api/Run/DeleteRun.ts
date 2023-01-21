import { expect } from "chai";
import request from "supertest";

import { Run } from "../../../src/entities/Run";

import { URL } from "../../utils/URL";

import { getToken } from "../../utils/common";

import createRun1Pass from "../../entities/Run/Pass/createRun1.json";
import createRun3Pass from "../../entities/Run/Pass/createRun3.json";
import updateRun1Pass from "../../entities/Run/Pass/updateRun1.json";

describe("Remoção de uma run", () => {
  let adminToken: string;

  it('Faz login no User "admin"', async () => {
    adminToken = await getToken("boca", "v512nj18986j8t9u1puqa2p9mh", "admin");
  });

  describe("Fluxo positivo", () => {
    it('Deleta a run 2 do problema "L1_2" em "Contest Beta"', async () => {
      const response = await request(URL)
        .delete("/api/contest/2/problem/2022102/run/2")
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(204);
      expect(response.headers).to.not.have.own.property("content-type");
      expect(response.body).to.be.empty;
    });

    it('Resgata todas as runs do problema "L1_2", mas a run de ID 2 foi deletada', async () => {
      const all = await request(URL)
        .get("/api/contest/2/problem/2022102/run")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`);

      expect(all.statusCode).to.equal(200);
      expect(all.headers["content-type"]).to.contain("application/json");
      expect(all.body).to.be.an("array");

      const run1 = all.body.find((run: Run) => run.runnumber === 1);
      const run2 = all.body.find((run: Run) => run.runnumber === 2);
      const run3 = all.body.find((run: Run) => run.runnumber === 3);

      expect(run2).to.be.undefined;

      expect(run1).to.be.an("object");
      expect(run1).to.have.own.property("runnumber");
      expect(run1).to.deep.include(createRun1Pass);
      expect(run1).to.deep.include(updateRun1Pass);

      expect(run3).to.be.an("object");
      expect(run3).to.have.own.property("runnumber");
      expect(run3).to.deep.include(createRun3Pass);
    });
  });

  describe("Fluxo negativo", () => {
    it("Tenta resgatar a run de ID 2 deletada", async () => {
      const response = await request(URL)
        .get("/api/contest/2/problem/2022102/run/2")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Run does not exist");
    });

    it("Tenta resgatar o arquivo da run de ID 2 deletada", async () => {
      const response = await request(URL)
        .get("/api/contest/2/problem/2022102/run/2/file")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Run does not exist");
    });

    it("Tenta deletar novamente a run de ID 2", async () => {
      const response = await request(URL)
        .delete("/api/contest/2/problem/2022102/run/2")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Run does not exist");
    });

    it("Tenta deletar a run 1 de um problema inexistente", async () => {
      const response = await request(URL)
        .delete("/api/contest/2/problem/2022104/run/1")
        .set("Accept", "application/json")
        .set("Authorization", `Token ${adminToken}`);

      expect(response.statusCode).to.equal(404);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("message");
      expect(response.body["message"]).to.include("Problem does not exist");
    });
  });
});
