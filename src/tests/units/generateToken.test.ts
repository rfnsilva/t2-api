import * as dotenv from "dotenv";
import { token } from "../../services/generateToken";
import { assert } from "chai";

dotenv.config();

describe("token", () => {
  test("generate token", async () => {
    const email = "email@test.com";
    const tokenResponse = await token(email);

    assert.exists(tokenResponse);
  });
});
