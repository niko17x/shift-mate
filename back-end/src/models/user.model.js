import mongoose from "mongoose";

const userSchema = mongoose.Schema(
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
    username: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    isFullTimeEmp: {
      type: Boolean,
      required: true,
    },
    tenure: {
      type: Number,
    },
    eCode: {
      type: String,
    },
    admin: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
