import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
  updateProfile,
  users,
  deleteUser,
  updateWeekNum,
  getActiveUserData,
  createEmployee,
} from "../controllers/user.controller.js";
import protect from "../middlewares/protect.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/create-employee", createEmployee);
router.get("/logout", protect, logoutUser);
router.get("/profile/:id", userProfile);
router.get("/users", users);
router.get("/active-user-data", protect, getActiveUserData);
router.put("/update-profile/:userId", updateProfile);
router.put("/update-week-num", updateWeekNum);
router.delete("/delete/:id", deleteUser);

export default router;
