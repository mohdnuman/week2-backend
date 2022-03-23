const express = require("express");
const router = express.Router();
const usersApiController = require("../../controllers/api/user_api");

// router.use('/posts',require("./posts.js"));
router.use("/user", require("./user.js"));
router.get("/user/:id", usersApiController.fetchUser);
router.use("/connection", require("./connection.js"));
router.use("/post", require("./post"));
router.use("/courses", require("./course"));
router.use("/lectures", require("./lecture"));
router.use('/mcq',require("./mcq.js"));
router.use('/fill',require("./fill.js"));
router.use('/code',require("./code"));


module.exports = router;
