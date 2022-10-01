import { expect } from "chai";
import request from "supertest";
import { contest1, contest2 } from "../../entities/Contest";
import { URL } from "../URL";

describe("POST /api/contests", () => {
  describe("Positive", () => {
    it("Creates a contest (specific set of acceptable values)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(contest1);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
    });
    
    it("Creates a second contest (different set of acceptable values)", async () => {
      const response = await request(URL)
        .post("/api/contests")
        .set("Accept", "application/json")
        .send(contest2);
      expect(response.statusCode).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.have.own.property("contestnumber");
    });
  });
  // describe("Negative", () => {
  //   it("Fails to create a contest", async () => {
  //     const response = await request(URL).post("/api/contests").send(contest1);
  //     expect(response.statusCode).to.equal(201);
  //   });
  // });
});
