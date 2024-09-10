import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  weekNum: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  shifts: [
    {
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
      },
    },
  ],
});

scheduleSchema.index({ employee: 1, weekNum: 1, year: 1 }, { unique: true });

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;

/**
 * 1. Indexing can cause a performance drain since, each new entry will have to be indexed. However, if querying read data far outweighs write data, indexing can have significant impact on speed.
 */
