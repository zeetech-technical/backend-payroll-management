import { Request, Response, NextFunction } from "express";
import { assignToTabSchema, createPositionSchema } from "./position.schema";
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

export const deletePostion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await positionService.deletePosition(+id);
    return res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const restorePostion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await positionService.restorePosition(+id);
    return res.status(200).json({ message: "Position restored successfully" });
  } catch (error) {
    next(error);
  }
};

export const assignToTab = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { success, data, error } = assignToTabSchema.safeParse(req.body);

  if (!success) {
    return next(error);
  }

  try {
    const tabulador = await positionService.assignTabToPosition(data);
    return res.status(200).json(tabulador);
  } catch (error) {
    next(error);
  }
};

export const selectPositionToTab = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const positions = await positionService.selectPositionToTab();
    return res.status(200).json(positions);
  } catch (error) {
    next(error);
  }
};

export const selectPositionUserAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const positions = await positionService.getPositionsUserAvailable();
    return res.status(200).json(positions);
  } catch (error) {
    next(error);
  }
};