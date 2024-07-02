import express from "express";
import {
  createUpdateSchedule,
  getEmployeeSchedule,
  scheduledEmployees,
} from "../controllers/schedule.controller.js";
const router = express.Router();

router.get("/", getEmployeeSchedule);
router.post("/create", createUpdateSchedule);
router.get("/employees", scheduledEmployees);

export default router;
