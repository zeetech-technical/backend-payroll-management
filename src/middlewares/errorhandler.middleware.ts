import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.error";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.status || 500;
  const {code , ...rest} = errorResponse({ err, statusCode });
  res.status(code).json(rest);
};
