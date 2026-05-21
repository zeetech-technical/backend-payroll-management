import { Router } from "express";
import {
  createTabulador,
  createTabuladorConfig,
  deleteTabulador,
  deleteTabuladorConfig,
  getAllTabulador,
  getAllTabuladorConfig,
  getTabuladorById,
} from "./tabulador.controller";

const router = Router();

router.get("/", getAllTabulador);
router.get("/:id", getTabuladorById);
router.post("/", createTabulador);
router.delete("/:id", deleteTabulador);
router.get("/config", getAllTabuladorConfig);
router.post("/config", createTabuladorConfig);
router.delete("/config/:tabuladorId/:catalogId", deleteTabuladorConfig);

export default router;
