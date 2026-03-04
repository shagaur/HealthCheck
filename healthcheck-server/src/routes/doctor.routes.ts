import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from "../controllers/doctor.controller";

const router = Router();

router.get("/get", getDoctors);
router.post("/create", protect, createDoctor);
router.put("/update", protect, updateDoctor);
router.delete("/delete", deleteDoctor);

export default router;
