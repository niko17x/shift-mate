import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.util.js";

export const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    jobTitle,
    isFullTime,
    tenure,
    eCode,
    isAdmin,
    weekNum,
  } = req.body;

  const errors = [];

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    // "field" property allows which input has error:
    errors.push({ field: "email", message: "Email already exists" });
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    errors.push({ field: "username", message: "Username already exists" });
  }

  const eCodeExists = await User.findOne({ eCode });
  if (eCodeExists) {
    errors.push({ field: "eCode", message: "Ecode already exists" });
  }

  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).json({ errors });
  }

  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
    jobTitle,
    isFullTime,
    tenure,
    eCode,
    isAdmin: isAdmin || false,
    weekNum: weekNum || null,
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
        email: newUser.email,
        jobTitle: newUser.jobTitle,
        isFullTime: newUser.isFullTime,
        tenure: newUser.tenure,
        eCode: newUser.eCode,
        isAdmin: true,
        weekNum: newUser.weekNum,
        // password: newUser.password,
      },
    });
  } else {
    res.status(400).json({
      message: "Failed to register user",
    });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    res.status(201).json({
      token,
      message: "Login successfull",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        jobTitle: user.jobTitle,
        isFullTimeEmp: user.isFullTimeEmp,
        tenure: user.tenure,
        eCode: user.eCode,
      },
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(1),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

export const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(400).json({
      message: "Failed to retrieve user profile",
    });
  }

  res.status(200).json({ message: "User profile succesfully loaded", user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "Failed to retrieve user profile" });
  }

  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.eCode = req.body.eCode || user.eCode;
  user.jobTitle = req.body.jobTitle || user.jobTitle;
  user.isFullTimeEmp = req.body.isFullTimeEmp || user.isFullTimeEmp;
  user.tenure = req.body.tenure || user.tenure;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    message: "Updated profile successfully",
    _id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    username: updatedUser.username,
    email: updatedUser.email,
    eCode: updatedUser.eCode,
    jobTitle: updatedUser.jobTitle,
    isFullTimeEmp: updatedUser.isFullTimeEmp,
    tenure: updatedUser.tenure,
  });
});

export const users = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(400).json({
      message: "Failed to retrieve users",
    });
  }

  res.status(200).json({ users });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "Failed to retrieve user",
    });
  }

  await user.deleteOne();

  res.status(200).json({
    message: "User deleted successfully",
  });
});

// admin create new user/employee w/o authentication
export const createUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    jobTitle,
    isFullTimeEmp,
    tenure,
    eCode,
    isAdmin,
  } = req.body;

  const userExists = await User.findOne({ eCode });

  if (userExists) {
    return res.status(400).json({
      message: "Failed to create user - eCode already exists",
    });
  }

  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
    jobTitle,
    isFullTimeEmp,
    tenure,
    eCode,
    isAdmin,
  });

  if (newUser) {
    return res.status(200).json({
      message: "User created successfully",
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      email: newUser.email,
      jobTitle: newUser.jobTitle,
      isFullTimeEmp: newUser.isFullTimeEmp,
      tenure: newUser.tenure,
      eCode: newUser.eCode,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(400).json({
      message: "Failed to create user",
    });
  }
});

export const updateWeekNum = asyncHandler(async (req, res) => {
  const { weekNum, currentUserId } = req.body;

  if (!weekNum || !currentUserId) {
    return res.status(400).json({
      message: "Failed to udpate week number for current user",
    });
  }

  const user = await User.findById(currentUserId);

  if (!user) {
    return res.status(400).json({
      message: "Failed to update week number - current user ID not found",
    });
  } else {
    user.weekNum = weekNum;
    await user.save();
  }

  res.status(200).json({
    message: "Updated week number for current user successfully",
  });
});
