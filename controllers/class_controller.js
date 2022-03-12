const Class = require("../models/class");
const User = require("../models/user");

module.exports.enroll = async (req, res) => {
  try {
    const classId = req.parmas;

    const userId = req.user.id;

    const response = await Class.findById(classId);

    const user = await User.findById(userId);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    if (user.classes.includes(classId)) {
      return res
        .status(400)
        .json({ success: false, message: "You are already enrolled" });
    }

    response.students.push(userId);
    response.meta.students += 1;
    await response.save();

    user.class.push(user);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Enrolled Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.getClassList = async (req, res) => {
  try {
    const user = req.params.user;

    console.log(user);

    const classList = await Class.find({ students: user }).populate({
      path: "teacher",
      select: "firstName lastName",
    });

    return res.status(200).json({ success: true, data: classList });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
