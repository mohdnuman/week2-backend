const { sendMail } = require("../helper/mail");
const Class = require("../models/class");
const Course = require("../models/course");
const Enroll = require("../models/Enroll");
const User = require("../models/user");

module.exports.getClassList = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    let page = req.query.page;

    if (!page || page <= 0) {
      page = 1;
    } else {
      page = parseInt(page);
    }

    const numberOfClassPerPage = 10;

    const classList = await Class.find({ course: courseId })
      .skip((page - 1) * numberOfClassPerPage)
      .limit(numberOfClassPerPage)
      .sort({ createdAt: -1 });

    return res.success(200).json({ success: false, data: classList });
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
    const courseId = req.body.courseId;

    const course = await Course.findOne({
      _id: courseId,
      instructor: { $in: [user] },
    });

    if (!course) {
      return res.status(403).json({ success: false, message: "Invalid User" });
    }

    const newClass = await Class.create({
      course: courseId,
      date: schedule,
      scheduleBy: user,
    });

    // Sending mail
    const Users = await Enroll.findOne({ course: courseId }).populate({
      path: "students",
      select: "email",
    });

    const userEmails = Users.students.map((s) => s.email);

    await sendMail(
      userEmails,
      `Schedule for ${course.name}`,
      `${course.name} has scheduled to ${schedule}`
    );

    return res.status(200).json({ success: true, message: "Class Scheduled" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.rescheduleClass = async (req, res) => {
  try {
    const user = req.params.user;
    const schedule = req.body.schedule;
    const classId = req.body.classId;

    const _class = await Class.findOne({ _id: classId });

    if (!_class) {
      return res
        .status(404)
        .json({ message: "Invalid class Id", success: false });
    }

    const course = await Course.findOne({
      _id: _class.course,
      instructor: { $in: [user] },
    });

    if (!course) {
      return res.status(403).json({ success: false, message: "Invalid User" });
    }

    _class.data = schedule;
    _class.scheduleBy = user;

    await _class.save();

    const Users = await Enroll.findOne({ course: course._id }).populate({
      path: "students",
      select: "email",
    });

    const userEmails = Users.students.map((s) => s.email);

    await sendMail(
      userEmails,
      `Rescheduled ${course.name}`,
      `${course.name} has scheduled to ${schedule}`
    );

    return res.status(200).json({ success: true, message: "Class Scheduled" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.deleteClass = async (req, res) => {
  try {
    const user = req.params.user;
    const classId = req.body.classId;

    const _class = await Class.findOne({ _id: classId });

    if (!_class) {
      return res
        .status(404)
        .json({ message: "Invalid class Id", success: false });
    }

    const course = await Course.findOne({
      _id: _class.course,
      instructor: { $in: [user] },
    });

    if (!course) {
      return res.status(403).json({ success: false, message: "Invalid User" });
    }

    await Class.findByIdAndDelete(classId);

    return res
      .status(200)
      .json({ success: false, message: "Class Deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
