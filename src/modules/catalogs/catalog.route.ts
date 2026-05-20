import { Router } from "express";
import {
  addCatalog,
  deleteCatalogLogically,
  getAllCatalog,
  getAllCatalogTypes,
  restoreCatalog,
} from "./catalog.controller";

const router = Router();

router
  .get("/", getAllCatalog)
  .post("/", addCatalog)
  .delete("/:id", deleteCatalogLogically)
  .put("/:id/restore", restoreCatalog)
  .get("/types", getAllCatalogTypes);

export default router;
