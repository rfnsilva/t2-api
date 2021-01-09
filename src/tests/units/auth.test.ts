import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import { token } from "../../services/generateToken";
import { auth } from "../../middlewares/auth";

dotenv.config();

describe("auth", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  test("testing auth middleware", async () => {
    const email = "email@test.com";
    const tokenResponse = await token(email);

    mockRequest = {
      headers: {
        authorization: `bearer ${tokenResponse}`,
      },
    };

    await auth(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
  });
});
