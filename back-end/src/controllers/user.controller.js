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

    // TODO => 'tenure' field is populating twice when logging in controller. Note that 'isFullTime' will never return an error since it has a default value of either false or true which is a '.notEmpty()' value.

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
  }),
];

export const loginUser = [
  body("username").notEmpty().withMessage("Username cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id);

      user.isLoggedIn = true;
      await user.save();

      return res.status(201).json({
        token,
        message: "Login successful",
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
          isLoggedIn: user.isLoggedIn,
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  }),
];

export const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    user.isLoggedIn = false;
    await user.save();
    console.log(user);
  }

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
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(400).json({ message: "Failed to retrieve user profile" });
  }
  //!
  // const { email } = req.body;
  // const errors = [];

  // const emailExists = await User.findOne({ email });
  // if (emailExists) {
  //   // "field" property allows which input has error:
  //   errors.push({ field: "email", message: "Email already exists" });
  // }

  // if (errors.length > 0) {
  //   console.log(errors);
  //   return res.status(400).json({ errors });
  // }
  //
  // TODO => IMPLEMENT VALIDATION MIDDLEWARE (CHECK CHATGPT)

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
    isFullTime: updatedUser.isFullTime,
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
      isLoggedIn: req.user.isLoggedIn,
    });
  } else {
    console.log("first");
    res.status(400).json({
      message: "User not found",
    });
  }
});
