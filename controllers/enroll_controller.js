const Course = require("../models/course");
const Enroll = require("../models/Enroll");

module.exports.enroll = async (req, res) => {
  try {
    const courseId = req.parmas.courseId;

    const userId = req.parmas.user;

    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ message: "Invalid Class Id", success: false });
    }

    let enroll = await Enroll.findOne({ course: courseId });

    if (!enroll) {
      enroll = await Enroll.create({ course: courseId });
    }

    if (enroll.students.contains(userId)) {
      return res
        .status(403)
        .json({ message: "Already Enrolled", success: false });
    }

    enroll.students.push(userId);
    enroll.meta.students += 1;
    await enroll.save();

    return res
      .status(200)
      .json({ success: true, message: "Enrolled Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.unenroll = async (req, res) => {
  try {
    const courseId = req.parmas.courseId;

    const userId = req.parmas.user;

    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ message: "Invalid Class Id", success: false });
    }

    let enroll = await Enroll.findOne({ course: courseId });

    if (!enroll) {
      enroll = await Enroll.create({ course: courseId });
    }

    if (!enroll.students.contains(userId)) {
      return res
        .status(403)
        .json({ message: "Not Enrolled in course", success: false });
    }

    enroll.students.pull(userId);
    enroll.meta.students -= 1;
    await enroll.save();

    return res
      .status(200)
      .json({ success: true, message: "Unenrolled Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.getMyCourseList = async (req, res) => {
  try {
    const user = req.parmas.userId;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid userID" });
    }

    let page = req.query.page;

    if (!page || page < 0) {
      page = 1;
    } else {
      page = parseInt(page);
    }

    const courseList = await Enroll.find({ students: { $in: [user] } })
      .select({ course: 1 })
      .populate({ path: "course", select: "name description category" });

    return res.status(200).json({ success: true, datat: courseList });
  } catch (error) {}
};
