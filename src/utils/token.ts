import jwt, { SignOptions } from "jsonwebtoken";
import { envs } from "../config/env";

const optionsJWT = { expiresIn: "1h" };

export const signPayload = (
  payload: any,
  config: SignOptions | undefined = optionsJWT,
) => {
  return jwt.sign(payload, envs.jwtSecret, config);
};

export const verifyToken = (token: string, exludeExp: boolean = false): any => {
  return jwt.verify(token, envs.jwtSecret, { ignoreExpiration: exludeExp });
};
