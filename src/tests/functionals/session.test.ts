import "reflect-metadata";
import express from "express";
import {
  createConnection,
  getRepository,
  getConnection,
  getMongoManager,
} from "typeorm";
import supertest from "supertest";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import { expect, assert } from "chai";

import { token } from "../../services/generateToken";

import routes from "../../routes";

import { User } from "../../entities/User";

const app = express();
app.use(bodyParser.json());
app.use(routes);
dotenv.config();

describe("authenticate", () => {
  beforeAll(async () => {
    return createConnection({
      type: "mongodb",
      host: "localhost",
      database: "t2_testing",
      useUnifiedTopology: true,
      synchronize: true,
      logging: false,
      entities: ["src/entities/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
    });
  });

  beforeEach(async () => {
    const manager = getMongoManager();
    await manager.clear(User);
  });

  afterAll(async () => {
    await getRepository(User).clear();
    const connection = getConnection();
    await connection.close();
  });

  test("session user and return jwt token", async () => {
    const user = {
      name: "user_test",
      email: "user@test.com",
      password: "12345678",
      cpf: "12345678",
      phone: "12345678",
    };
    const tokenResponse = await token(user.email);

    await supertest(app)
      .post(`/createUser`)
      .send(user)
      .set("authorization", "bearer " + tokenResponse);

    const responseSession = await supertest(app)
      .post(`/session`)
      .send({ email: user.email, password: user.password });

    expect(responseSession.status).to.equal(200);
    assert.exists(responseSession.body.token);
  });
});
