const express = require("express");
const enrollController = require("../../controllers/enroll_controller");
const router = express.Router();

router.post("/enroll/:user/:coruseId", enrollController.enroll);
router.post("/unenroll/:user/:coruseId", enrollController.unenroll);
router.post("/list/:userId", enrollController.getMyCourseList);

module.exports = router;
