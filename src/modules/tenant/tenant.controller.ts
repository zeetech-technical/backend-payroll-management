import { NextFunction, Request, Response } from "express";
import { TenantService } from "./tenant.service";
const tenantService = new TenantService()

export const getTenants = async (req: Request, res: Response , next: NextFunction) => {
  try {
    const tenants = await tenantService.getTenants();
    res.json(tenants);
  } catch (err) {
    next(err);
  }
}