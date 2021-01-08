import cors from "cors";
import { Router, Request, Response } from "express";

import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "./controllers/UserController";
import { session } from "./controllers/SessionController";

const routes = Router();

routes.use(cors());

routes.get("/", (request: Request, response: Response) => {
  response.json({ message: "PRONTO CARALHOOOOO !" });
});

routes.post("/session", session);

routes.post("/createUser", createUser);
routes.get("/getUser/:id", getUser);
routes.put("/updateUser/:id", updateUser);
routes.delete("/deleteUser/:id", deleteUser);

export default routes;
