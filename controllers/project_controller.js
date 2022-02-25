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
