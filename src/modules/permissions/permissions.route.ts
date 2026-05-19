import { Router } from "express";
import {
  createPermission,
  deleteDestroyPermission,
  deleteLogicalPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
} from "./permissions.controller";
import { can } from "../../middlewares/can.middleware";

const router = Router();

router.get("/", can("PERMISSION:LIST"), getAllPermissions);
router.get("/:id", can("PERMISSION:READ"), getPermissionById);
router.post("/", can("PERMISSION:CREATE"), createPermission);
router.patch("/:id", can("PERMISSION:UPDATE"), updatePermission);
router.delete("/:id", can("PERMISSION:DELETE"), deleteLogicalPermission);
router.delete("/destroy/:id", can("PERMISSION:DESTROY"), deleteDestroyPermission);

export default router;
