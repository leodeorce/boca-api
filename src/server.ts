import express from "express";
import dotenv from "dotenv"

dotenv.config();

import { router } from "./routes";

import "./database";
import "./shared/container";

const app = express();

app.use(express.json());

app.use(router);

app.listen(3333, () => console.log("Server is running."));
