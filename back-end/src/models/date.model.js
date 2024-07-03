import mongoose from "mongoose";

const dateSchema = mongoose.Schema({
  dayOne: {
    type: String,
    index: true,
  },
  dayTwo: {
    type: String,
    index: true,
  },
  dayThree: {
    type: String,
    index: true,
  },
  dayFour: {
    type: String,
    index: true,
  },
  dayFive: {
    type: String,
    index: true,
  },
  daySix: {
    type: String,
    index: true,
  },
  daySeven: {
    type: String,
    index: true,
  },
});

const Date = mongoose.model("Date", dateSchema);

export default Date;
