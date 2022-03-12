const mongoose=require('mongoose');
const multer = require("multer");
const path = require("path");

const VIDEO_PATH = path.join("/uploads/lectures/videos");

const lectureSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video: {
        type: String,
      }
},{
    timestamps:true
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", VIDEO_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//static methods
lectureSchema.statics.uploadedVideo = multer({ storage: storage }).single(
  "video"
);
lectureSchema.statics.videoPath = VIDEO_PATH;

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
// const Post=mongoose.model('Post',postSchema);
// module.exports=Post;