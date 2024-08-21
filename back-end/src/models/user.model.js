import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    // profilePic: {},
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    jobTitle: {
      type: String,
      // required: true,
    },
    isFullTime: {
      type: Boolean,
      // required: true,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
