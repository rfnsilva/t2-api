import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { token } from "../services/generateToken";
import * as bcrypt from "bcrypt";

import { User } from "../entities/User";

export const session = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getRepository(User).findOne({ email: email });

  if (await bcrypt.compare(password, user.password)) {
    const tokenSession = await token(email);

    return res.status(200).json({ token: tokenSession, user: { user: user } });
  } else {
    return res.status(404).json({ messge: "error session controler" });
  }
};
