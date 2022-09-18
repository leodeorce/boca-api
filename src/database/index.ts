import { DataSource } from "typeorm";
import * as path from "path";

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5555;

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: dbPort,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [path.join(__dirname, "migrations", "*.ts")],
  entities: [path.join(__dirname, "..", "entities", "*.ts")],
});

export { AppDataSource };
