import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/user.model.js";
import Employee from "../models/employee.model.js";

export const createEmployee = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Must be in email format")
    .custom(async (value) => {
      const userEmailExists = await User.findOne({ email: value });
      const employeeEmailExists = await Employee.findOne({ email: value });
      if (userEmailExists || employeeEmailExists) {
        throw new Error("Email already exists");
      }
    }),
  body("jobTitle").trim().notEmpty().withMessage("Please make a selection"),
  body("isFullTime").trim().notEmpty().withMessage("Please make a selection"),
  body("tenure").trim().notEmpty().withMessage("Tenure is required"),
  body("eCode")
    .trim()
    .notEmpty()
    .withMessage("ECODE is required")
    .bail()
    .custom(async (value) => {
      const userEcodeExists = await User.findOne({ eCode: value });
      const employeeEcodeExists = await Employee.findOne({ eCode: value });

      if (userEcodeExists || employeeEcodeExists) {
        throw new Error("ECODE already exists");
      }
    }),
  // ? How to handle isAdmin property for employee?
  body("isAdmin").optional(),

  asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      jobTitle,
      isFullTime,
      tenure,
      eCode,
      isAdmin,
      weekNum,
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "All fields must be completed",
      });
    }

    const newEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      jobTitle,
      isFullTime,
      tenure,
      eCode,
      isAdmin: isAdmin || false,
      weekNum: weekNum || null,
    });

    if (newEmployee) {
      res.status(201).json({
        message: "Employee created successfully",
        employee: {
          _id: newEmployee._id,
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          email: newEmployee.email,
          jobTitle: newEmployee.jobTitle,
          isFullTime: newEmployee.isFullTime,
          tenure: newEmployee.tenure,
          eCode: newEmployee.eCode,
          isAdmin: true,
          weekNum: newEmployee.weekNum,
        },
      });
    } else {
      res.status(400).json({
        message: "Failed to create employee",
      });
    }
  }),
];

export const getAllEmployees = asyncHandler(async (req, res) => {
  const { sortBy, order } = req.query;

  const sortOptions = {};
  sortOptions[sortBy] = order === "asc" ? 1 : -1;
  const allEmployees = await Employee.find().sort(sortOptions);

  // const allEmployees = await Employee.find().sort({ firstName: 1 });

  if (allEmployees.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(allEmployees);
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const result = await Employee.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 0) {
    return res.status(400).json({
      message: "Failed to delete employee",
    });
  }

  res.status(200).json({
    message: "Employee successfully deleted",
  });
});

export const employeeProfile = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id });

  console.log(employee);

  if (!employee) {
    return res.status(400).json({
      message: "Employee does not exist",
    });
  }

  res.status(200).json(employee);
});
