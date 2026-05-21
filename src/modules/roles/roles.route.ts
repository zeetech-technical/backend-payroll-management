import { Router } from "express";
import {
  createRole,
  deleteDestroyRole,
  deleteLogicalRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "./roles.controller";
import { can } from "../../middlewares/can.middleware";

const router = Router();

router
  .get("/", can("ROLE:LIST"), getAllRoles)
  .get("/:id", can("ROLE:READ"), getRoleById)
  .post("/", can("ROLE:CREATE"), createRole)
  .patch("/:id", can("ROLE:UPDATE"), updateRole)
  .delete("/:id", can("ROLE:DELETE"), deleteLogicalRole)
  .delete("/destroy/:id", can("ROLE:DESTROY"), deleteDestroyRole);

export default router;
