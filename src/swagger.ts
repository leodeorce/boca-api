import swaggerJSDoc from "swagger-jsdoc";
import {
  contestResponseSchema,
  createContestSchema,
  updateContestSchema,
} from "./entities/Contest";
import { errorSchema } from "./errors/ApiError";

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
      CreateContest: createContestSchema,
      UpdateContest: updateContestSchema,
    },
  },
};

const swaggerOptions = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
});

export { swaggerOptions };
