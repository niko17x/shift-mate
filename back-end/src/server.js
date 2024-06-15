// main connection point for back end

import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
import userRoute from "../src/routes/user.route.js";

// connect mongoDB
db();

const app = express();

const server_port = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/user", userRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server initiated on port ${server_port}`);
});
