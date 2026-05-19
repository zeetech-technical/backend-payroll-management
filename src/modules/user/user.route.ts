import { Router } from "express";
import {
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
  .put("/", putUser)
  .delete("/:id", deleteUser);

export default router;
