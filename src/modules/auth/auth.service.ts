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
  async generateTokens(
    user: User,
    data: Pick<ISession, "deviceInfo" | "userAgent" | "ip">,
    identifierDevice?: string,
  ) {
    const deviceId = identifierDevice || randomUUID();
    const refreshToken = randomUUID();

    const accessToken = signPayload(
      {
        sub: user.id,
        deviceId,
      },
      { expiresIn: "15m" },
    );

    await this.saveSession({
      userId: user.id,
      deviceId,
      refreshToken,
      ...data,
    });
    return { accessToken, refreshToken };
  }

  async saveSession(data: ISession) {
    const sessionKey = `auth:refresh:${data.userId}:${data.deviceId}`;
    const userIndexKey = `auth:refresh:user:${data.userId}`;

    const tokenHash = createHash("sha256")
      .update(data.refreshToken)
      .digest("hex");

    const session = {
      tokenHash,
      device: data.deviceInfo,
      userAgent: data.userAgent,
      ip: data.ip,
    };

    const ttl = 60 * 60 * 24 * 7;

    // const pipeline = redis.multi();
    // pipeline.set(sessionKey, JSON.stringify(session), "EX", ttl);
    // pipeline.sadd(userIndexKey, data.deviceId);
    // pipeline.expire(userIndexKey, ttl);

    // await pipeline.exec();
  }

  async deleteSession(userId: number, deviceId: string) {
    // const pipeline = redis.multi();
    // pipeline.del(`auth:refresh:${userId}:${deviceId}`);
    // pipeline.srem(`auth:refresh:user:${userId}`, deviceId);
    // await pipeline.exec();
  }

  // 2FA TOKEN

  async generate2FAToken(userId: number) {
    // const jti = randomUUID();
    // const tempToken = signPayload({ sub: userId, jti }, { expiresIn: "15m" });
    // await redis.set(`auth:2FA:${jti}`, JSON.stringify({ userId }), "EX", 900);
    // return tempToken;
  }

  // cookie BODY

  emitCookie(res: Response, type: "refresh_token", value: any) {
    // if (type === "refresh_token") {
    //   res.cookie("refresh_token", value, this.cookieOptionsRefreshToken);
    // }
  }

  clearCookie(res: Response, type: "refresh_token") {
    if (type === "refresh_token") {
      res.clearCookie("refresh_token", {
        path: "/api/v1/auth/refresh-token",
      });
    }
  }

  // format data from req
  extractRequestMetadata(req: Request) {
    // const userAgent = req.headers["user-agent"];
    // const parser = new UAParser(userAgent);
    // const ip = req.ip ?? null;
    return {
      deviceInfo: null,
      userAgent : null,
      ip : null,
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
    return
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
