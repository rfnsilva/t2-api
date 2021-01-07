import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";

import { User } from "../entities/User";

beforeAll(() => {
  return createConnection({
    type: "sqlite",
    database: "./src/tests/db/db.sqlite",
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
  });
});

beforeEach(async () => {
  await getRepository(User).query(`
    CREATE TABLE User (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL UNIQUE,
      cpf TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
});

afterEach(async () => {
  await getRepository(User).query(`DROP TABLE User`);
});

describe("my test", () => {
  test("is test", () => {
    expect(3).toEqual(3);
  });
});
