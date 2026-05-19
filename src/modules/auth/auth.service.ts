import { createHash, randomUUID } from "node:crypto";
import { User } from "../user/user.model";
import { signPayload } from "../../utils/token";
import { envs } from "../../config/env";
import { Request, Response } from "express";

import { Roles } from "../roles/roles.model";

interface ISession {
  userId: number;
  deviceId: string;
  refreshToken: string;
  deviceInfo: any;
  userAgent: any;
  ip: string | null;
}

export class AuthService {
  isProd = envs.nodeEnv === "production";

  async foundUser(email: string): Promise<User | null> {
    const user = await User.scope().findOne({
      where: { email },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "tenantId", "email"],
      },
      include: [
        {
          model: Roles,
          as: "roles",
          attributes: ["id"],
          through: { attributes: [] },
        },
      ],
    });

    // if (!user)
    //   throw new ErrorCustom("User not found", { code: 404, type: "NOT_FOUND" });
    return user;
  }

  async foundUserById(id: number): Promise<User> {
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "tenantId"],
      },
    });

    if (!user) throw new Error("User not found");
    return user;
  }

  async me(id: number): Promise<User> {
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "tenantId"],
      },
      include: [
        {
          model: Roles,
          as: "roles",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!user) throw new Error("User not found");
    return user;
  }

  // TOKENS SESSIONS
  async generateTokens(user: User) {
    const accessToken = signPayload({
      sub: user.id,
    });
    return accessToken;
  }

  // format data from req
  extractRequestMetadata(req: Request) {
    // const userAgent = req.headers["user-agent"];
    // const parser = new UAParser(userAgent);
    // const ip = req.ip ?? null;
    return {
      deviceInfo: null,
      userAgent: null,
      ip: null,
    };
  }

  async getUserSessions(userId: number) {
    // return await redis.smembers(`auth:refresh:user:${userId}`);
    return [];
  }

  async getDataSession(userId: number) {
    return [];
  }

  async deleteUserSessions(userId: number, sessions: string[]) {
    return;
  }

  //   const result: string[] = [];
  //   let cursor = "0";

  //   do {
  //     const [nextCursor, keys] = await redis.scan(
  //       cursor,
  //       "MATCH",
  //       `auth:refresh:${userId}:*`,
  //       "COUNT",
  //       100,
  //     );

  //     cursor = nextCursor;
  //     result.push(...keys);
  //   } while (cursor !== "0");

  //   return result;
  // }
}
