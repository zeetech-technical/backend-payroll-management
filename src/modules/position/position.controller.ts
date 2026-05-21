import { Request, Response, NextFunction } from "express";

export const getAllPositions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "Positions fetched successfully" });
  } catch (error) {
    next(error);
  }
}

export const getPositionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "Position fetched successfully" });
  } catch (error) {
    next(error);
  }
}

export const updatePostion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "Position updated successfully" });
  } catch (error) {
    next(error);
  }
}

export const createPostion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "Position created successfully" });
  } catch (error) {
    next(error);
  }
}