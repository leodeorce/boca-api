import { expect } from "chai";
import { createHash } from "crypto";
import request from "supertest";
import * as fs from "fs";
import * as crypto from "crypto";

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
    fs.mkdirSync(secretsDir);
  }

  const privateKeyPath = secretsDir + "/private.key";
  const publicKeyPath = secretsDir + "/public.key";

  if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
    const keyPair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    fs.writeFileSync(privateKeyPath, keyPair.privateKey);
    fs.writeFileSync(publicKeyPath, keyPair.publicKey);
  }
};

export { getToken, verifyRSA };
