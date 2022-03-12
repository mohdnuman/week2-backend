const express = require("express");
const router = express.Router();
const classController = require("../../controllers/class_controller");

router.post("/:classId", classController.enroll);

router.get("/my/:user", classController.getClassList);

module.exports = router;
