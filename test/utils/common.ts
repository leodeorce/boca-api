import { expect } from "chai";
import { createHash } from "crypto";
import request from "supertest";
import * as fs from "fs";

import { URL } from "./URL";

const getToken = async (
  password: string,
  salt: string,
  username: string
): Promise<string> => {
  let hashedPassword = "";
  if (password !== "") {
    hashedPassword = createHash("sha256").update(password).digest("hex");
  }

  const hash = createHash("sha256")
    .update(hashedPassword + salt)
    .digest("hex");

  const response = await request(URL)
    .get("/api/token")
    .query({
      name: username,
      password: hash,
    })
    .set("Accept", "application/json");

  expect(response.statusCode).to.equal(200);
  expect(response.headers["content-type"]).to.contain("application/json");

  const token = response.body["accessToken"];
  const count = token.match(/\./g)?.length;

  expect(count).to.equal(2);

  return token;
};

const verifyRSA = () => {
  const secretsDir = "./secrets";
  if (!fs.existsSync(secretsDir)) {
    console.error("O par de chaves RSA não está configurado");
  }
};

export { getToken, verifyRSA };
