const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project_controller");

router.get("/:projectId", projectController.getProject);

module.exports = router;
