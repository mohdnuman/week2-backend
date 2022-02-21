const express = require("express");
const router = express.Router();
const workshopController = require("../controllers/workshop_controller");
// Get the workshop
router.get("/:id", workshopController.getWorkShop);

// Create the workshop
router.post("/create", workshopController.createWorkShop);

module.exports = router;
