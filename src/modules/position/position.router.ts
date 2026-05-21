import { Router } from "express";
import {
  getAllPositions,
  getPositionById,
  updatePostion,
  createPostion,
  deletePostion,
  restorePostion,
  assignToTab,
  selectPositionToTab,
  selectPositionUserAvailable,
} from "./position.controller";

const router = Router();

router
  .get("/", getAllPositions)
  .get("/select-position", selectPositionToTab)
  .get("/select-position-user", selectPositionUserAvailable)
  .get("/:id", getPositionById)
  .post("/", createPostion)
  .delete("/:id", deletePostion)
  .put("/:id", updatePostion)
  .put("/:id/restore", restorePostion)
  .post("/assign-to-tab", assignToTab);

export default router;
