import { Router } from "express";
import { getTenants } from "./tenant.controller";

const router = Router();

router
  .get("/", getTenants)

export default router;