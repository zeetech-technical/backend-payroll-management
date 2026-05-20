import { NextFunction, Request, Response } from "express";
import { CatalogsService } from "./catalogs.service";
import { CatalogSchema } from "./catalog.schema";
const catalogService = new CatalogsService();

export const getAllCatalog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await catalogService.getAllCatalog();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const addCatalog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data, success, error } = CatalogSchema.safeParse(req.body);
  if (!success) return next(error);
  const { typeCatalogId } = data;

  try {
    const type = await catalogService.getTypeCatalogById(typeCatalogId);
    if (!type) return next({ type: "custom_error", code: "NOT_FOUND" });

    const result = await catalogService.addCatalog(data);
    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};

export const getAllCatalogTypes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await catalogService.getCatalogTypes();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


export const deleteCatalogLogically = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await catalogService.deleteCatalogLogically(Number(req.params.id));
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const restoreCatalog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await catalogService.restoreCatalog(Number(req.params.id));
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
