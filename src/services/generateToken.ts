import * as jwt from "jsonwebtoken";

export const token = async (email: string) => {
  return jwt.sign({ email }, process.env.SECRET, {
    expiresIn: "1d",
  });
};
