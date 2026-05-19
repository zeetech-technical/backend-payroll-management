import { NextFunction, Request, Response } from "express";
import { PermissionsService } from "./permissions.service";
import { createPermissionSchema } from "./permissions.schema";
const permissionsService = new PermissionsService();

export const getAllPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const permissions = await permissionsService.getAllPermissions();
    return res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};

export const getPermissionById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const permission = await permissionsService.getPermissionById(Number(id));
    return res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};

export const createPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data, success, error } = createPermissionSchema.safeParse(req.body);
  if (!success) {
    return next(error);
  }
  try {
    const permission = await permissionsService.createPermission(data);
    return res.status(201).json(permission);
  } catch (error) {
    next(error);
  }
};

export const updatePermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { data, success, error } = createPermissionSchema.safeParse(req.body);
  if (!success) {
    return next(error);
  }
  try {
    const permission = await permissionsService.updatePermission(Number(id), data);
    return res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};

export const deleteLogicalPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const permission = await permissionsService.deleteLogicalPermission(Number(id));
    return res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};

export const deleteDestroyPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const permission = await permissionsService.deleteDestroyPermission(Number(id));
    return res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};