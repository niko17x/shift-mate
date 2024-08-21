import express from "express";
// import protect from "../middlewares/protect.middleware.js";
import { createEmployee } from "../controllers/employee.controller.js";
const router = express.Router();

router.post("/create-employee", createEmployee);

export default router;
