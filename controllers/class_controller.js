const { sendMail } = require("../helper/mail");
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

    console.log(req);

    if (!user) {
      return res.sendStatus(403);
    }

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

module.exports.scheduleClass = async (req, res) => {
  try {
    const user = req.params.user;
    const schedule = req.body.schedule;
    const classId = req.body.classId;

    const _class = await Class.findOne({
      _id: classId,
    }).populate({ path: "students", select: "email" });

    if (!_class) {
      return res.sendStatus(403);
    }

    _class.schedule.push({ date: schedule });

    const userEmails = _class.students.map((s) => s.email);

    console.log(_class, userEmails);
    await _class.save();

    await sendMail(
      userEmails,
      `Schedule for ${_class.name}`,
      `${_class.name} has scheduled to ${schedule}`
    );

    return res.status(200).json({ success: true, message: "Class Scheduled" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
