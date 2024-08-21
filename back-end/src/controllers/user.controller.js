import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.util.js";
import { body, validationResult } from "express-validator";

export const registerUser = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Must be in email format")
    .custom(async (value) => {
      const emailExists = await User.findOne({ email: value });
      if (emailExists) {
        throw new Error("Email already exists");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("jobTitle").trim().notEmpty().withMessage("Please make a selection"),
  body("isFullTime").trim().notEmpty().withMessage("Please make a selection"),
  body("tenure").trim().notEmpty().withMessage("Tenure is required"),
  body("eCode").trim().notEmpty().withMessage("ECODE is required"),
  body("isAdmin").optional(),

  asyncHandler(async (req, res) => {
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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
          _id: newUser._id,
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
  }),
];

export const loginUser = [
  body("username").trim().notEmpty().withMessage("Username cannot be empty"),
  body("password").trim().notEmpty().withMessage("Password cannot be empty"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id);

      await user.save();

      return res.status(201).json({
        token,
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
      console.log("first");
      return res.status(400).json({ message: "Invalid credentials" });
    }
  }),
];

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

export const updateProfile = [
  body("firstName").trim().notEmpty().withMessage("This field is required"),
  body("lastName").trim().notEmpty().withMessage("This field is required"),
  body("username").trim().notEmpty().withMessage("This field is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("This field is required")
    .isEmail()
    .withMessage("Input must be in email format")
    .bail()
    .custom(async (value) => {
      const emailExists = await User.findOne({ email: value });
      if (emailExists) {
        throw new Error("Email already exists");
      }
    }),
  body("eCode")
    .trim()
    .notEmpty()
    .withMessage("This field is required")
    .isLength(5)
    .bail()
    .withMessage("Ecode must contain 5 characters"),
  body("jobTitle").trim().notEmpty().withMessage("This field is required"),
  body("tenure")
    .trim()
    .notEmpty()
    .withMessage("This field is required")
    .bail()
    .isInt()
    .withMessage("Input must contain only numbers"),
  body("newPassword")
    .optional()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters"),

  // 1. Input password matches previous password.
  // 2. If match, update current password to new password.
  // 3. If no match, return

  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(400).json({ message: "Failed to retrieve user profile" });
    }

    const { password, newPassword } = req.body;

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.eCode = req.body.eCode || user.eCode;
    user.jobTitle = req.body.jobTitle || user.jobTitle;
    user.tenure = req.body.tenure || user.tenure;
    if (req.body.hasOwnProperty("isFullTime")) {
      user.isFullTime = req.body.isFullTime;
    }
    if (password && newPassword) {
      if (await user.matchPassword(password)) {
        user.password = newPassword;
      } else {
        return res.status(400).json({
          message: "Current password is invalid",
        });
      }
    }

    const updatedUser = await user.save();

    console.log("passed");

    res.status(200).json({
      message: "Updated profile successfully",
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      username: updatedUser.username,
      email: updatedUser.email,
      eCode: updatedUser.eCode,
      jobTitle: updatedUser.jobTitle,
      isFullTime: updatedUser.isFullTime,
      tenure: updatedUser.tenure,
    });
  }),
];

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

export const getActiveUserData = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      username: req.user.username,
      email: req.user.email,
      jobTitle: req.user.jobTitle,
      isFullTimeEmp: req.user.isFullTimeEmp,
      tenure: req.user.tenure,
      eCode: req.user.eCode,
    });
  } else {
    console.log("first");
    res.status(400).json({
      message: "User not found",
    });
  }
});
