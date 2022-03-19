const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now() },
    scheduleBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
