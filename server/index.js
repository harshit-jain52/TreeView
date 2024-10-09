const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const locationRoutes = require("./routes/locationRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening to port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/locations", locationRoutes);
app.use("/api/items", itemRoutes);
