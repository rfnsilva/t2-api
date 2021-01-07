import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

import { User } from "../entities/User";

// cria um usuario
export const createUser = async (req: Request, res: Response) => {
  const { name, email, cpf, phone, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 8);

  const user = await getRepository(User).save({
    name,
    email,
    cpf,
    phone,
    password: passwordHash,
  });

  return res.status(201).json(user);
  // return res.status(404).json({ message: "erro ao pegar getHome" });
};

// get_user
export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await getRepository(User).findOne(id);

  return res.status(200).json(user);
};

// update user by id
export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const resultado = await getRepository(User).update(id, req.body);

  if (resultado.affected === 0) {
    return res.status(404).json({ message: "error update user" });
  }

  const users = await getRepository(User).find();

  return res.status(200).json(users);
};

// delete user by id
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const resultado = await getRepository(User).delete(id);

  if (resultado.affected === 0) {
    return res.status(404).json({ message: "error delete user" });
  }

  const users = await getRepository(User).find();

  return res.status(200).json(users);
};
