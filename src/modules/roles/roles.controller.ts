import { NextFunction, Request, Response } from "express";
import { RolesService } from "./roles.service";
import { createRoleSchema } from "./roles.schema";

const rolesService = new RolesService();

export const getAllRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await rolesService.getAllRoles();
    return res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const role = await rolesService.getRoleById(Number(id));
    return res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data, success, error } = createRoleSchema.safeParse(req.body);
  if (!success) {
    return next(error);
  }
  try {
    const role = await rolesService.createRole(data);
    return res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { data, success, error } = createRoleSchema.safeParse(req.body);
  if (!success) {
    return next(error);
  }
  try {
    const role = await rolesService.updateRole(Number(id), data);
    return res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const deleteLogicalRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    try {
        const role = await rolesService.deleteLogicalRole(Number(id));
        return res.status(200).json(role);
    } catch (error) {
        next(error);
    }
};

export const deleteDestroyRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    try {
        const role = await rolesService.deleteDestroyRole(Number(id));
        return res.status(200).json(role);
    } catch (error) {
        next(error);
    }
};