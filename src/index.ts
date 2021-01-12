import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { createConnection } from "typeorm";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./config/swagger_output.json";

import routes from "./routes";

const app = express();

app.use(bodyParser.json());

app.use(routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

dotenv.config();

createConnection();

app.listen(process.env.PORT || 3333);
