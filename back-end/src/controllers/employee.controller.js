import expressAsyncHandler from "express-async-handler";
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
  body("eCode").trim().notEmpty().withMessage("ECODE is required"),
  // ? How to handle isAdmin property for employee?
  body("isAdmin").optional(),

  expressAsyncHandler(async (req, res) => {
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
      console.log(errors);
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
