import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { createUserSchema } from "./user.schema";
import { getPagination } from "../../utils/paginate";

const userService = new UserService();

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit } = req.query;
    // const pageNumber = page ? Number(page) : 1;
    // const limitNumber = limit ? Number(limit) : 10;
    // const data = await userService.getUsers(pageNumber, limitNumber);
    // res.json({ pagination: { page: pageNumber, limit: limitNumber }, data });
    // const pagination = getPagination(5, 10, 500);
    // res.json({ pagination });
  } catch (err) {
    next(err);
  }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  res.json({
    msg: " Usuarios",
  });
};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = createUserSchema.safeParse(req.body);
    if (!result.success) {
      return next(result.error);
    }
    let user = await userService.postUser(result.data);
    const { password, ...userResponse } = user.toJSON();
    return res.status(201).json(userResponse);
  } catch (error: any) {
    next(error);
  }
};

export const putUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { body } = req;
  res.json({
    msg: " Usuarios",
  });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  res.json({
    msg: " Usuarios",
  });
};
