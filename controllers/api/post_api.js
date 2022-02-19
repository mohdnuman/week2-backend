const Post = require("../../models/post");
const User = require("../../models/user");
const axios = require("axios");

module.exports.create = async function (req, res) {
  try {
    Post.uploadedAvatar(req, res, async function (err) {
      if (err) console.log("**********Multer Error :", err);

      let post = await Post.create({
        content: req.body.content,
        user: req.body.userId,
      });
      let user = await User.findById(req.body.userId);
      // console.log(user);
      user.posts.push(post);
      user.save();
      post = await post.populate("user", "name");
      // post.content=req.body.conetnt;
      // user.email=req.body.email;
      if (req.file) {
        if (post.avatar) {
          if (fs.existsSync(path.join(__dirname, "..", post.avatar))) {
            fs.unlinkSync(path.join(__dirname, "..", post.avatar));
          }
        }
        post.avatar = Post.avatarPath + "/" + req.file.filename;
      }
      post.save();
      // return res.redirect('back');
      return res.status(200).json({
        data:{
            post:post
        },
        statusText:"post created!"
    })
    });
        
  } catch (err) {
    console.log("error occurred:", err);
    return res.json(500, {
      message: "internal server error!",
    });
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          statusText: "post deleted!",
        });
      }
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error occurred:", err);
    return res.json(500, {
      message: "internal server error!",
    });
  }
};
