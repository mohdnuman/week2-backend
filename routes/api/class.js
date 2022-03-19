const express = require("express");
const router = express.Router();
const classController = require("../../controllers/class_controller");

router.get("/list/:courseId", classController.getClassList);

router.patch("/schedule/:user", classController.scheduleClass);

router.patch("/reschedule/:user", classController.rescheduleClass);

router.patch("/delete/:user", classController.deleteClass);

module.exports = router;
