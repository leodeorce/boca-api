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
};

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
  description:
    'Token de autorização no formato "Token <token_jwt_aqui>" sem os <>.',
  required: true,
  type: "string",
};

const getTokenRequest = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["name", "password"],
        properties: {
          name: {
            type: "string",
            description: "Nome do usuário.",
          },
          password: {
            type: "string",
            description:
              "Resultado da hash SHA256 sobre a concatenação do salt " +
              "com a hash SHA256 sobre a senha do usuário.",
          },
        },
      },
    },
  },
};

const tokenSchema = {
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
      Token: tokenSchema,
    },
    requestBodies: {
      CreateContest: createContestRequest,
      UpdateContest: updateContestRequest,
      GetToken: getTokenRequest,
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
