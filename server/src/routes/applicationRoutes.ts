import express from "express";
import { createApplication, updateApplicationStatus, listApplications } from "../controllers/applicationController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware(["tenant"]), createApplication);
router.put("/:id/status", authMiddleware(["manager"]), updateApplicationStatus);
router.get("/", authMiddleware(["tenant", "manager"]), listApplications);

export default router;