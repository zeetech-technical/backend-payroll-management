import { Request, Response, NextFunction } from "express";

export const responseWrapper = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const oldJson = res.json;
  res.json = function (data: any) {
    if (data?.pagination) {
      return oldJson.call(this, data);
    }
    return oldJson.call(this, {
      data,
    });
  };
  next();
};
