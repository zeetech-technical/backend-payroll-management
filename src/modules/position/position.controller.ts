import { Request, Response, NextFunction } from "express";
import { createPositionSchema } from "./position.schema";
import { PositionService } from "./position.service";
const positionService = new PositionService();

export const getAllPositions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const positions = await positionService.getAllPositions();
    return res.status(200).json(positions);
  } catch (error) {
    next(error);
  }
};

export const getPositionById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.status(200).json({ message: "Position fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updatePostion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.status(200).json({ message: "Position updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const createPostion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { success, data, error } = createPositionSchema.safeParse(req.body);

  if (!success) {
    return next(error);
  }

  try {
    const position = await positionService.createPosition(data);
    return res.status(200).json(position);
  } catch (error) {
    next(error);
  }
};
