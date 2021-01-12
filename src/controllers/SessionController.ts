import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

import { token } from "../services/generateToken";

import { User } from "../entities/User";

export const session = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getRepository(User).findOne({ email: email });

  if (user !== undefined) {
    if (await bcrypt.compare(password, user.password)) {
      const tokenSession = await token(email);

      return res
        .status(200)
        .json({ token: tokenSession, user: { user: user } });
    } else {
      return res.json({ message: "error password incorrect" });
    }
  } else {
    return res.json({ message: "error user not found" });
  }
};
