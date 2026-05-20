import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/token";
import { UserService } from "../user/user.service";
import logger from "../../utils/logger";

const userService = new UserService();
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next({ type: "custom_error", code: "NOT_TOKEN_PROVIDED" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    const { sub } = payload;
    if (!sub) {
      return next({ type: "custom_error", code: "INVALID_TOKEN_PAYLOAD" });
    }
    const user = await userService.getUser(Number(sub));
    if (!user) {
      return next({ type: "custom_error", code: "USER_NOT_FOUND" });
    }


    req.token = token;
    req.user = user.get({ plain: true });


    const permissionSet = new Set<string>();
    user.permissions?.forEach(p => permissionSet.add(p.slug));
    user.roles?.forEach(role => {
      role.permissions?.forEach(p => permissionSet.add(p.slug));
    });
    req.permissions = permissionSet;

    next();
  } catch (error: any) {
    return next(error);
  }
};
