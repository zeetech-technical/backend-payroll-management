import { Router } from "express";
import { listDevices, me, refreshToken, signIn, signOut, signOutAllDevices } from "./auth.controller";
import { authMiddleware } from "./auth.middleware";

const router = Router();
router
  .post("/sign-in", signIn)
  .post("/refresh-token", refreshToken)
  .get("/me", authMiddleware, me)
  .post("/me/sign-out", authMiddleware, signOut)
  .post("/me/sign-out-sesion-devices", authMiddleware, signOutAllDevices)
  .post("/me/devices", authMiddleware, listDevices)


export default router;
