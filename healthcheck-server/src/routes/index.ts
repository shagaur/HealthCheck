import { Router } from "express";
import authRoutes from "./auth.routes";
import orgRoutes from "./org.routes";
import docRoutes from "./doctor.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/org", orgRoutes);
router.use("/doc", docRoutes);

export default router;
