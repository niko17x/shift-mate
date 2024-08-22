import express from "express";
// import protect from "../middlewares/protect.middleware.js";
import {
  createEmployee,
  getAllEmployees,
} from "../controllers/employee.controller.js";
const router = express.Router();

router.post("/create-employee", createEmployee);
router.get("/all-employees", getAllEmployees);

export default router;
