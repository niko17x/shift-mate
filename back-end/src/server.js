// main connection point for back end

import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const server_port = process.env.SERVER_PORT || 5000;

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server initiated on port ${server_port}`);
});
