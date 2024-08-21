// main connection point for back end

import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
import userRoute from "../src/routes/user.route.js";
import scheduleRoute from "../src/routes/schedule.route.js";
import employeeRoute from "../src/routes/employee.route.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import cors from "cors";

// connect mongoDB
db();

const app = express();

const server_port = process.env.SERVER_PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/employee", employeeRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server initiated on port ${server_port}`);
});
