const express = require("express");
const router = express.Router();
const classController = require("../../controllers/class_controller");

router.post("/:classId", classController.enroll);

router.get("/my/:user", classController.getClassList);

router.patch("/schedule/:user", classController.scheduleClass);

module.exports = router;
