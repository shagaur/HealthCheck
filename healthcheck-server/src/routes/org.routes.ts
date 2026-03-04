import { Router } from "express";
import { createOrganization, getOrganizations } from "../controllers/org.controller";
import { validateOrgAccess } from "../middlewares/org.middleware";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/get", getOrganizations);
router.post("/create", createOrganization);

export default router;
