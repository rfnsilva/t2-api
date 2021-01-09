import cors from "cors";
import { Router, Request, Response } from "express";

import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
} from "./controllers/UserController";
import { session } from "./controllers/SessionController";

import { auth } from "./middlewares/auth";

const routes = Router();

routes.use(cors());

routes.get("/", (request: Request, response: Response) => {
  response.json({ message: "PRONTO CARALHOOOOO !" });
});

routes.post("/session", session);

routes.use(auth);

routes.post("/createUser", createUser);
routes.get("/getUser/:id", getUser);
routes.get("/getUsers", getUsers);
routes.put("/updateUser/:id", updateUser);
routes.delete("/deleteUser/:id", deleteUser);

export default routes;
