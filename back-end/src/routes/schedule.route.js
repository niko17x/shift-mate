import express from "express";
import {
  createSchedule,
  updateSchedule,
  getScheduledEmployees,
  createShift,
} from "../controllers/schedule.controller.js";
const router = express.Router();

router.get("/scheduled-employees", getScheduledEmployees);
router.post("/create-schedule", createSchedule);
router.post("/create-shift", createShift);
router.put("/update", updateSchedule);

export default router;
