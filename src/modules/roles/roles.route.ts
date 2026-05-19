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

router.get("/", can("ROLE:LIST"), getAllRoles);
router.get("/:id", can("ROLE:READ"), getRoleById);
router.post("/", can("ROLE:CREATE"), createRole);
router.patch("/:id", can("ROLE:UPDATE"), updateRole);
router.delete("/:id", can("ROLE:DELETE"), deleteLogicalRole);
router.delete("/destroy/:id", can("ROLE:DESTROY"), deleteDestroyRole);

export default router;
