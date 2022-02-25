const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id)
      .populate("followers")
      .populate("following");

    return res.render("profile", {
      profile_user: user,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile/" + req.user.id);
  }
  return res.render("user-sign-up");
};

module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile/" + req.user.id);
  }
  return res.render("user-sign-in");
};

module.exports.create = function (req, res) {
  //todo

  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error occurred while finding user in sign up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, newUser) {
        if (err) {
          console.log("error occurred while creatin new user");
          return;
        }
        console.log("*****", newUser);
        return res.redirect("/user/sign-in");
      });
    } else {
      res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  res.redirect("/user/profile/" + req.user.id);
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) console.log("**********Multer Error :", err);

        user.username = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            if (fs.existsSync(path.join(__dirname, "..", user.avatar))) {
              fs.unlinkSync(path.join(__dirname, "..", user.avatar));
            }
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      return;
    }
  } else {
    return res.status(401).send("Unauthorised");
  }
};

module.exports.getProfile = async function (req, res) {
  try {
    const { username } = req.parmas;

    const user = await User.findOne({ username })
      .populate("followers")
      .populate("following");
    return res.render("profile", {
      profile_user: user,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports.getUserClassList = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate(
      "class",
      "name teacher meta"
    );

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
