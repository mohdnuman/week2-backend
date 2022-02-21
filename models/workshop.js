const mongoose = require("mongoose");

const WorkshopSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  date: {
    starting: { type: Date },
    ending: { type: Date },
    registrationStart: { type: Date },
    registrationEnd: { type: Date },
  },
  teamSize: { type: Number },
  registrationFess: { type: Number },
  eligibility: [{ type: String }],
});

const Workshop = mongoose.model("Workshop", WorkshopSchema);
module.exports = Workshop;
