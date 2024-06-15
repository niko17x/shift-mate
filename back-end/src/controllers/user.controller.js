import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.util.js";

export const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    jobTitle,
    isFullTimeEmp,
    tenure,
    eCode,
    admin,
  } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({
      message: "Username is already exists",
    });
  }

  const newUser = await User.create({
    firstName,
    lastName,
    username,
    jobTitle,
    isFullTimeEmp,
    tenure,
    eCode,
    admin,
  });

  if (newUser) {
    // create new JWT token
    generateToken(res, newUser._id);
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        jobTitle: newUser.jobTitle,
        isFullTimeEmp: newUser.isFullTimeEmp,
        tenure: newUser.tenure,
        eCode: newUser.eCode,
        admin: true,
      },
    });
  } else {
    res.status(400).json({
      message: "Failed to register user",
    });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "hello" });
});

export const logoutUser = asyncHandler(async (req, res) => {});

export const getUserProfile = asyncHandler(async (req, res) => {});
