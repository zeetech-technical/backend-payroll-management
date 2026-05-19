import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/token";
import { UserService } from "../user/user.service";

const userService = new UserService();
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return next({ type: "custom_error", code: "NOT_TOKEN_PROVIDED" });
  // }

  // const token = authHeader.slice(7);

  try {
    // const payload = verifyToken(token);
    // const { sub, deviceId } = payload;
    // if (!sub || !deviceId) {
    //   return next({ type: "custom_error", code: "INVALID_TOKEN_PAYLOAD" });
    // }

    // const key = `auth:refresh:${sub}:${deviceId}`;
    // const session = await redis.get(key);

    // if (!session) {
    //   return next({ type: "custom_error", code: "SESSION_REVOKED" });
    // }
    // req.token = token;
    // req.user = payload;

    // const user = await userService.getUser(Number(sub));
    // if (!user) {
    //   return next({ type: "custom_error", code: "USER_NOT_FOUND" });
    // }
    // const permissionSet = new Set<string>();
    // user.permissions?.forEach(p => permissionSet.add(p.slug));
    // user.roles?.forEach(role => {
    //   role.permissions?.forEach(p => permissionSet.add(p.slug));
    // });
    // req.permissions = permissionSet;
    
    next();
  } catch (error: any) {
    return next(error);
  }
};
