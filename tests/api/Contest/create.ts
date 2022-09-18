import { expect } from "chai";
import request from "supertest";
import { URL } from "../URL";

describe("POST /api/contests", () => {
  describe("Positive", () => {
    it("Returns status 201", async () => {
      const reqContest = {
        contestname: "Primeiro Contest",
        conteststartdate: 1642008089,
        contestduration: 0,
        contestlastmileanswer: 0,
        contestlastmilescore: 0,
        contestlocalsite: 1,
        contestpenalty: 1200,
        contestmaxfilesize: 100000,
        contestactive: true,
        contestmainsite: 1,
        contestkeys: "",
        contestunlockkey: "",
        contestmainsiteurl: "",
      };

      const response = await request(URL).post("/api/contests").send(reqContest);

      expect(response.statusCode).to.equal(201);
    });
  });
});
