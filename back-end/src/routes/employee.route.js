import express from "express";
// import protect from "../middlewares/protect.middleware.js";
import {
  createEmployee,
  deleteEmployee,
  employeeProfile,
  getAllEmployees,
} from "../controllers/employee.controller.js";
const router = express.Router();

router.post("/create-employee", createEmployee);
router.get("/all-employees", getAllEmployees);
router.get("/profile/:id", employeeProfile);
router.delete("/delete/:id", deleteEmployee);

export default router;
