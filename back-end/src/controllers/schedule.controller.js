import asyncHandler from "express-async-handler";
import Schedule from "../models/schedule.model.js";

export const getEmployeeSchedule = asyncHandler(async (req, res) => {
  const { employeeId } = req.body;
  const schedule = await Schedule.findOne({
    employeeId,
  })
    .lean()
    .exec();
  // const schedule = await Schedule.findOne({
  //   "employees.employee": "6675a14854e81afa1b9b3ced",
  // })
  //   .lean()
  //   .exec();

  if (!schedule) {
    throw new Error("No schedules found");
  }

  const employeeSchedule = schedule.employees.find(
    (e) => e.employee.toString() === employeeId.toString()
  );

  res.status(200).json({
    message: "Retrieved employee schedule successfully",
    employeeSchedule,
  });
});

// Create schedule for a single date:
export const createSchedule = asyncHandler(async (req, res) => {
  const { employeeId, weekNum, year, date, startTime, endTime, notes } =
    req.body;

  const existingSchedule = await Schedule.findOne({
    employee: employeeId,
    // "schedules.date": date,
    weekNum,
    year,
  });

  if (existingSchedule) {
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

  const existingSchedule = await Schedule.findOne({
    employee: employeeId,
    year,
    weekNum,
  });

  if (!existingSchedule) {
    return res.status(404).json({
      message: "Schedule does not exist. Please create schedule for employee",
      origin: "Server => createShift function",
    });
  }

  const existingShift = existingSchedule.shifts.find(
    (shift) => shift.date.toISOString().split("T")[0] === date.toString()
  );

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

    existingSchedule.shifts.push(newShift);
  }

  const updatedSchedule = await existingSchedule.save();

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
  const { year, weekNum, employeeId } = req.body;

  const foo = await Schedule.find({ weekNum });

  res.status(200).json(foo);
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
