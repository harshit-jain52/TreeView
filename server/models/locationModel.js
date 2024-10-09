const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  parent_godown: { type: String, default: null },
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;