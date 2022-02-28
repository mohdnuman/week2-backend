const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String },
  meta: {
    students: { type: Number, default: 0 },
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
