import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { User } from "../entities/User";

export const session = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getRepository(User).findOne({ email: email });

  if (await bcrypt.compare(password, user.password)) {
    const tokenSession = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token: tokenSession });
  } else {
    return res.status(404).json({ messge: "error session controler" });
  }
};
