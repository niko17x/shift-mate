import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    // profilePic: {},
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    isFullTime: {
      type: Boolean,
      required: true,
    },
    tenure: {
      type: Number,
    },
    eCode: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      // required: true,
    },
    weekNum: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
