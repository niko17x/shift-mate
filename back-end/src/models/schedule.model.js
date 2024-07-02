import mongoose from "mongoose";

const schedule = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    weekNum: {
      type: Number,
    },
    // startLunch: {
    //   type: Number,
    // },
    // endLunch: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", schedule);

export default Schedule;
