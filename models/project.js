const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  completed: { type: Number, default: 0 },
  thumbnail: { type: String },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
