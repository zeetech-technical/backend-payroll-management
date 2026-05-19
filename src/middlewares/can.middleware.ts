import { NextFunction, Request, Response } from "express";
;
export const can = (required: string | string[]) => {
  const requiredArray = Array.isArray(required) ? required : [required];

  return (req:Request, res:Response, next:NextFunction) => {
    const has = requiredArray.every(p => req.permissions?.has(p));
    if (!has) {
      next({type: "custom_error", code: "UNAUTHORIZED"});
    }
    next();
  };
};