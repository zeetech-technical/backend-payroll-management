import { Router } from "express";
import {
  assignPosition,
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from "./user.controller";

const router = Router();

router
  .get("/", getUsers)
  .get("/:id", getUser)
  .post("/", postUser)
  .post("/assign-position", assignPosition)
  .put("/", putUser)
  .delete("/:id", deleteUser);

export default router;
