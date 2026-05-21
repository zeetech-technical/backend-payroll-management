import { Router } from "express";
import { authMiddleware } from "../modules/auth/auth.middleware";
import authRouter from "../modules/auth/auth.route";
import permissionsRouter from "../modules/permissions/permissions.route";
import rolesRouter from "../modules/roles/roles.route";
import userRouter from "../modules/user/user.route";
import catalogsRouter from "../modules/catalogs/catalog.route";
import tabuladorRouter from "../modules/tabulador/tabulador.router";
import positionsRouter from "../modules/position/position.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/permissions", authMiddleware, permissionsRouter);
router.use("/roles", authMiddleware, rolesRouter);
router.use("/tabulador", authMiddleware, tabuladorRouter);
router.use("/users", authMiddleware, userRouter);
router.use("/catalogs", authMiddleware, catalogsRouter);
router.use("/positions", authMiddleware, positionsRouter);

export default router;
