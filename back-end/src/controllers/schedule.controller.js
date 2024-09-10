import asyncHandler from "express-async-handler";
import Schedule from "../models/schedule.model.js";

// Create schedule for a single date:
export const createSchedule = asyncHandler(async (req, res) => {
  const { employeeId, weekNum, year, date, startTime, endTime, notes } =
    req.body;

  const schedule = await Schedule.findOne({
    employee: employeeId,
    weekNum,
    year,
  });

  if (schedule) {
    return res.status(400).json({
      message: `Schedule for employee on ${date} already exists`,
      origin: "Server Error: createSchedule",
    });
  }

  const newSchedule = await Schedule.create({
    employee: employeeId,
    weekNum,
    year,
    shifts: [
      {
        date,
        startTime,
        endTime,
        notes,
      },
    ],
  });

  if (newSchedule) {
    res.status(201).json({
      message: "Schedule created successfully",
      schedule: newSchedule,
    });
  } else {
    res.status(500).json({
      message: "Failed to create schedule",
      origin: "Server Error: createSchedule function",
    });
  }
});

export const createShift = asyncHandler(async (req, res) => {
  const { employeeId, year, weekNum, date, startTime, endTime, notes } =
    req.body;

  const schedule = await Schedule.findOne({
    employee: employeeId,
    year,
    weekNum,
  });

  if (!schedule) {
    return res.status(404).json({
      message: "Schedule does not exist. Please create schedule for employee",
      origin: "Server => createShift function",
    });
  }

  const existingShift = schedule.shifts
    .find((shift) => shift.date.toISOString().split("T")[0] === date.toString())
    .sort((a, b) => a.date - b.date);

  // schedule.shifts.sort((a, b) => a.date - b.date);

  if (existingShift) {
    existingShift.date = date;
    existingShift.startTime = startTime;
    existingShift.endTime = endTime;
    existingShift.notes = notes;
  } else {
    const newShift = {
      date,
      startTime,
      endTime,
      notes,
    };

    schedule.shifts.push(newShift);
  }

  const updatedSchedule = await schedule.save();

  res.status(200).json({
    message: "Shift successfully updated",
    updatedSchedule,
  });
});

// todo => Function should be updating shift not schedule => fix!
export const updateSchedule = asyncHandler(async (req, res) => {
  const { scheduleId, shiftId, date, startTime, endTime, notes } = req.body;

  const schedule = await Schedule.findOne({ _id: scheduleId });

  if (!schedule) {
    return res.status(400).json({
      message: "Selected schedule does not exist",
      origin: "Server Error: updateSchedule function",
    });
  }

  const shift = schedule.shifts.id(shiftId);

  if (!shift) {
    return res.status(400).json({
      message: "Selected shift does not exist",
      origin: "Server Error: updateSchedule function",
    });
  }

  (shift.date = date || shift.date),
    (shift.startTime = startTime || shift.startTime),
    (shift.endTime = endTime || shift.endTime),
    (shift.notes = notes || shift.notes);

  await schedule.save();

  res.status(200).json({
    message: "Shift successfully updated",
    schedule,
  });
});

// Get scheduled employees matching given year and week number
export const scheduledEmployees = asyncHandler(async (req, res) => {
  const { year, weekNum } = req.body;

  if (!year || !weekNum) {
    return res.status(400).json({
      message: "Inputs year and weekNum are missing",
    });
  }

  // docs matching input weekNum and extracted year
  const schedules = await Schedule.find({
    weekNum: weekNum,
    $expr: {
      $eq: [{ $year: "$date" }, year],
    },
  });

  if (schedules.length === 0) {
    return res.status(404).json({
      message: "No schedules found for the specified year and week number",
    });
  }

  res.status(200).json({ schedules });
});

export const getScheduledEmployees = asyncHandler(async (req, res) => {
  console.log("server");
  const { employeeId, year, weekNum } = req.query;

  console.log(employeeId, year, weekNum);

  // First => Get all employees with matching employeeId, year, weekNum:
  const schedule = await Schedule.findOne({
    employee: employeeId,
    year,
    weekNum,
  });

  if (!schedule) {
    return res.status(404).json({
      message: "Employee schedule does not exist",
      origin: "Server => getScheduledEmployees function",
    });
  }

  schedule.shifts.sort((a, b) => a.date - b.date);

  const updatedSchedule = await schedule.save();

  res.status(200).json(updatedSchedule);

  // query for employee schedules matching employee, year and weekNum.
  // then query for shifts with matching dates.
  // push all schedules into an array for client access.
});

/**
 * 1. Storing calendar dates for display for rendering in client:
 * function displayDates()
 * client side function takes weekNum || date (ex: 2024-12-12) & provides 7 days to server to store in DB
 *
 * 2. Mongoose has a special method to search for a specific property when you have multiple objects in an array by using ".id(id_data)". Example: schedule.shift.id(shiftId) => Finds _id property matching shiftId within shift object.
 *
 * 3. Use "error.code = 11000" to check for MongoDB error codes from console.
 */
