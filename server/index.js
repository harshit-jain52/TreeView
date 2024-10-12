const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const locationRoutes = require("./routes/locationRoutes");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const userAuth = require("./middleware/userAuth");

const { APP_ORIGIN, PORT, ENV } = require("./constants/env");

const { connectDB } = require("./config/db");

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Health check
app.get("/", (_, res) => {
  return res.status(200).json({
    status: "healthy",
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use(userAuth);
app.use("/api/locations", locationRoutes);
app.use("/api/items", itemRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${ENV} mode`);
  await connectDB();
});
