import { NextFunction, Request, Response } from "express";
import { createHash } from "node:crypto";

import { compareHashChain } from "../../utils/bycript";
import { verifyToken } from "../../utils/token";

import { AuthSignInSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

import logger from "../../utils/logger";

const authService = new AuthService();

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parseBody = AuthSignInSchema.safeParse(req.body);
  if (!parseBody.success) return next(parseBody.error);
  const { email, password: passwordCompare } = parseBody.data;

  const metadata = authService.extractRequestMetadata(req);

  const paylodlog = {
    message: "intento de acceso",
    email,
    ip: metadata.ip,
    userAgent: metadata.userAgent,
  };

  try {
    const user = await authService.foundUser(email);
    if (!user) {
      logger.warn(`[auth:signin]: data: ${JSON.stringify(paylodlog)}`);
      return next({ type: "custom_error", code: "INVALID_CREDENTIALS" });
    }
    const isValid = await compareHashChain(passwordCompare, user.password);
    if (!isValid) {
      logger.warn(`[auth:signin]: data: ${JSON.stringify(paylodlog)}`);
      return next({ type: "custom_error", code: "INVALID_CREDENTIALS" });
    }

    const { password, ...userPayload } = user.get({ plain: true });
    const accessToken = await authService.generateTokens(userPayload);

    res.json({ "access-token": accessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  const refreshToken = req.cookies["refresh_token"];
  const payload = verifyToken(token, true);

  if (!payload) {
    return next({ type: "custom_error", code: "TOKEN_EXPIRED" });
  }

  const { sub: userId, deviceId, ...rest } = payload;
  if (!userId || !deviceId) {
    return next({ type: "custom_error", code: "TOKEN_EXPIRED" });
  }
  const user = await authService.foundUserById(userId);
  if (!user) return next({ type: "custom_error", code: "INVALID_CREDENTIALS" });

  const { password, ...userPayload } = user.get({ plain: true });
  const accessToken = await authService.generateTokens(userPayload);

  return res.json({ "access-token": accessToken });
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // if (!req.user) {
  //   return next({ type: "custom_error", code: "SESSION_REVOKED" });
  // }
  // const { sub, deviceId } = req.user;
  // try {
  //   // await authService.deleteSession(sub, deviceId);
  //   return res.status(204).send();
  // } catch (error) {
  //   console.log(error);
  // }
};

export const signOutAllDevices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return next({ type: "custom_error", code: "SESSION_REVOKED" });
  const { sub, deviceId } = req.user;
  const keys = await authService.getUserSessions(sub);
  const sessionWithoutCurrent = keys.filter(
    (item: string) => item !== deviceId,
  );
  await authService.deleteUserSessions(sub, sessionWithoutCurrent);
  res.json({ message: "All sessions have been closed" });
};

export const listDevices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return next({ type: "custom_error", code: "SESSION_REVOKED" });
  const { sub } = req.user;
  try {
    let sessions = await authService.getDataSession(sub);
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return next({ type: "custom_error", code: "SESSION_REVOKED" });
  const { sub } = req.user;
  try {
    let user = await authService.me(sub);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
