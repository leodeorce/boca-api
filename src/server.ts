import express from "express";

import { router } from "./routes";
import { AppDataSource } from "./database/index";
import "./shared/container";

import {
  errorLogger,
  errorHandler,
  fallbackRouteHandler,
  fallbackErrorHandler,
  requestLogger,
} from "./middleware";

AppDataSource.initialize()
  .then(() => {
    console.log("Connection to database was successful");
  })
  .catch((err) => {
    console.error("Database connection failed:\n", err);
    console.log("Aborting...");
    process.exit(1);
  });

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(fallbackRouteHandler);
app.use(errorLogger);
app.use(errorHandler);
app.use(fallbackErrorHandler);

const listenPort = process.env.LISTEN_PORT
  ? parseInt(process.env.LISTEN_PORT)
  : 3333;

app.listen(listenPort, () =>
  console.log(`Server is listening on port ${listenPort}`)
);
