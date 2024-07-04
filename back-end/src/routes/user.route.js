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
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile/:id", userProfile);
router.get("/users", users);
router.put("/update-profile/:id", updateProfile);
router.put("/update-week-num", updateWeekNum);
router.delete("/delete/:id", deleteUser);

export default router;
