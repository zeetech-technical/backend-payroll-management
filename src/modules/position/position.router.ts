import { Router } from "express";
import {
  getAllPositions,
  getPositionById,
  updatePostion,
  createPostion,
} from "./position.controller";

const router = Router();

router
  .get("/", getAllPositions)
  .get("/:id", getPositionById)
  .post("/", createPostion)
  .put("/:id", updatePostion);

export default router;
