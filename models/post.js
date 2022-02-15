const mongoose=require('mongoose');
const User=require('./user');
const multer = require("multer");
const path = require("path");

const AVATAR_PATH = path.join("/uploads/posts/images");

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    avatar: {
        type: String,
      },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//static methods
postSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
postSchema.statics.avatarPath = AVATAR_PATH;

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
// const Post=mongoose.model('Post',postSchema);
// module.exports=Post;