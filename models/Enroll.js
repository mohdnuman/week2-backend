const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    meta: {
      students: { type: Number, default: 0 },
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Enroll = mongoose.model("Enroll", enrollSchema);

module.exports = Enroll;
