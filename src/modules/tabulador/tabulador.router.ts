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
} from "./tabulador.controller";

const router = Router();

router.get("/stats", getTabuladorAllStats);
router.get("/config", getAllTabuladorConfig);
router.post("/config", createTabuladorConfig);
router.get("/", getAllTabulador);
router.get("/:id", getTabuladorById);
router.post("/", createTabulador);
router.delete("/:id", deleteTabulador);
router.delete("/config/:tabuladorId/:catalogId", deleteTabuladorConfig);

export default router;
