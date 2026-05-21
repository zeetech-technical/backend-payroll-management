import { Router } from "express";
import {
  createTabulador,
  createTabuladorConfig,
  deleteTabulador,
  deleteTabuladorConfig,
  getAllTabulador,
  getAllTabuladorConfig,
  getTabuladorAllStats,
  getTabuladorById,
  getTabuladorUserStats,
} from "./tabulador.controller";

const router = Router();

router
  .get("/stats", getTabuladorAllStats)
  .get("/config", getAllTabuladorConfig)
  .get("/user-stats", getTabuladorUserStats)
  .post("/config", createTabuladorConfig)
  .get("/", getAllTabulador)
  .get("/:id", getTabuladorById)
  .post("/", createTabulador)
  .delete("/:id", deleteTabulador)
  .delete("/config/:tabuladorId/:catalogId", deleteTabuladorConfig);

export default router;
