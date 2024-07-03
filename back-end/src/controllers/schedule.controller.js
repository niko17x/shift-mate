import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Schedule from "../models/schedule.model.js";

export const getEmployeeSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findOne({
    "employees.employee": "6675a14854e81afa1b9b3ced",
  })
    .lean()
    .exec();

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

export const createUpdateSchedule = asyncHandler(async (req, res) => {
  const { scheduleId, employeeId, date, weekNum, startTime, endTime, notes } =
    req.body;

  let schedule = await Schedule.findOne({ _id: scheduleId });
  console.log(date.split("-")[0]);

  if (schedule) {
    schedule.date = date || schedule.date;
    schedule.startTime = startTime || schedule.startTime;
    schedule.endTime = endTime || schedule.endTime;
    schedule.notes = notes || schedule.notes;
    schedule.weekNum = weekNum || schedule.weekNum;

    const updatedSchedule = await schedule.save();
    res.status(200).json({
      _id: updatedSchedule._id,
      date: updatedSchedule.date.toISOString().split("T")[0],
      startTime: updatedSchedule.startTime,
      endTime: updatedSchedule.endTime,
      notes: updatedSchedule.notes,
      weekNum: updatedSchedule.weekNum,
    });
  } else {
    const newSchedule = await Schedule.create({
      employee: employeeId,
      date,
      startTime,
      endTime,
      notes,
      weekNum,
    });
    res.status(200).json({
      _id: newSchedule._id,
      date: newSchedule.date.toISOString().split("T")[0],
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime,
      notes: newSchedule.notes,
      weekNum: newSchedule.weekNum,
    });
  }
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

/**
 * Storing calendar dates for display for rendering in client:
 * function displayDates()
 * client side function takes weekNum || date (ex: 2024-12-12) & provides 7 days to server to store in DB
 *
 */
