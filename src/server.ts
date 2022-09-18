import express from "express";
import { router } from "./routes";
import { AppDataSource } from "./database/index";
import "./shared/container";

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
app.use(router);

const listenPort = process.env.LISTEN_PORT ? parseInt(process.env.LISTEN_PORT) : 3333;

app.listen(listenPort, () => console.log(`Server is listening on port ${listenPort}`));
