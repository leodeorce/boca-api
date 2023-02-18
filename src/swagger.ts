import swaggerJSDoc from "swagger-jsdoc";
import {
  contestResponseSchema,
  createContestRequest,
  updateContestRequest,
} from "./entities/Contest";
import { errorSchema } from "./errors/ApiError";

const unauthorizedResponse = {
  description: "Requisição não autenticada.",
  content: {
    "application/json": {
      schema: errorSchema,
    },
  },
};

const badRequest = {
  description: "Requisição mal formatada.",
  content: {
    "application/json": {
      schema: errorSchema,
    },
  },
}

const contestId = {
  name: "id_c",
  in: "path",
  description: "O identificador da competição.",
  required: true,
  type: "string",
};

const authorization = {
  name: "Authorization",
  in: "header",
  description: "Token de autorização no formato \"Token <token_jwt_aqui>\" sem os <>.",
  required: true,
  type: "string",
};

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "BOCA API",
    version: "1.0.0",
    description: "Uma API para o BOCA Online Contest Administrator",
  },
  components: {
    schemas: {
      Error: errorSchema,
      Contest: contestResponseSchema,
    },
    requestBodies: {
      CreateContest: createContestRequest,
      UpdateContest: updateContestRequest,
    },
    responses: {
      Unauthorized: unauthorizedResponse,
      BadRequest: badRequest,
    },
    parameters: {
      ContestId: contestId,
      Authorization: authorization,
    },
  },
};

const swaggerOptions = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
});

export { swaggerOptions };
