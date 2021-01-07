import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { createConnection } from "typeorm";

import routes from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(routes);

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });
createConnection();

// console.log(process.env.NODE_ENV);

app.listen(process.env.PORT || 3333);
