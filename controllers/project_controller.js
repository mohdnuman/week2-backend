const Project = require("../models/project");

module.exports.getProject = async function (req, res) {
  try {
    const { projectId } = req.parmas;

    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid project ID" });
    }

    return res.json({ project });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.getUserProjectList = async function (req, res) {
  try {
    const user = req.params.user;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "UserId not present" });
    }

    const projectList = await Project.find({ user });

    return res.status(200).json({ success: true, data: projectList });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, message: "Internal Server Error" });
  }
};
