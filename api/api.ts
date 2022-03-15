import express from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
// env config
dotenv.config({ path: `${path.resolve(__dirname, "..")}/.env` });

import config from "./config";
import dbService from "./services/db.service";

const environment = process.env.NODE_ENV;

const app = express();
const server = new http.Server(app);

app.set("socketio", config.createSocket(server));
const DB = dbService(environment, config.migrate);
config.useMiddlewares(app);

server.listen(config.port, () => {
  if (
    environment !== "production" &&
    environment !== "development" &&
    environment !== "testing"
  ) {
    console.error(
      `NODE_ENV is set to ${environment}, but only production and development are valid.`
    );
    process.exit(1);
  }
  return DB;
});
