import { Router } from "express";
import { authMiddleware } from "../modules/auth/auth.middleware";
import authRouter from "../modules/auth/auth.route";
import permissionsRouter from "../modules/permissions/permissions.route";
import rolesRouter from "../modules/roles/roles.route";
import userRouter from "../modules/user/user.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/permissions", authMiddleware, permissionsRouter);
router.use("/roles", authMiddleware, rolesRouter);
router.use("/users", authMiddleware, userRouter);

export default router;
