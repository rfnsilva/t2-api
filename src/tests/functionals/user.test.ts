import "reflect-metadata";
import express from "express";
import { createConnection, getRepository, getConnection } from "typeorm";
import supertest from "supertest";
import * as bodyParser from "body-parser";
import { expect } from "chai";

import routes from "../../routes";
import { User } from "../../entities/User";

const app = express();
app.use(bodyParser.json());
app.use(routes);

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

afterEach(async () => {
  await getRepository(User).clear();
});

afterAll(async () => {
  const connection = getConnection();
  connection.close();
});

describe("User CRUD", () => {
  test("create user", async () => {
    const user = {
      name: "user_test",
      email: "user@test.com",
      password: "12345678",
      cpf: "12345678",
      phone: "12345678",
    };

    const response = await supertest(app).post(`/createUser`).send(user);

    expect(response.status).to.equal(201);
  });

  test("get User", async () => {
    const user = {
      name: "user_test",
      email: "user@test.com",
      password: "12345678",
      cpf: "12345678",
      phone: "12345678",
    };

    const response = await supertest(app).post(`/createUser`).send(user);

    const userResponse = await supertest(app).get(
      `/getUser/${response.body.id}`
    );

    expect(userResponse.status).to.equal(200);
    // expect(response.status).exist();
  });

  test("update user by id", async () => {
    const user = {
      name: "name_test",
      email: "uemail@test.com",
      password: "12345678",
      cpf: "12345678",
      phone: "12345678",
    };

    const response = await supertest(app).post(`/createUser`).send(user);

    const userUpdate = {
      name: "name_test_update",
      email: "email_update@test.com",
      password: "12345678",
      cpf: "123456780",
      phone: "123456780",
    };

    const userResponse = await supertest(app)
      .put(`/updateUser/${response.body.id}`)
      .send(userUpdate);

    expect(userResponse.status).to.equal(200);
  });

  test("delete user by id", async () => {
    const user = {
      name: "name_test",
      email: "uemail@test.com",
      password: "12345678",
      cpf: "12345678",
      phone: "12345678",
    };

    const response = await supertest(app).post(`/createUser`).send(user);

    const userResponse = await supertest(app).delete(
      `/deleteUser/${response.body.id}`
    );

    expect(userResponse.status).to.equal(200);
  });
});
