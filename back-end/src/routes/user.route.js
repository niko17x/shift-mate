import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
  updateProfile,
  users,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile/:id", userProfile);
router.get("/users", users);
router.put("/update-profile/:id", updateProfile);

export default router;
