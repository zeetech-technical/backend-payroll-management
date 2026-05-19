import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      token:string
      user?: {
        sub:number;
        deviceId :string;
        id: number;
        jti: string;
        [key: string]: any;
      };
      permissions?: Set<string>;
    }
  }
}