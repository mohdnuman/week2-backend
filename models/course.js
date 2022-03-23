const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const AVATAR_PATH = path.join("/uploads/courses/images");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    instructor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//static methods
courseSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
courseSchema.statics.avatarPath = AVATAR_PATH;

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
