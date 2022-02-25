const express = require("express");
const WorkshopModel = require("../schema");

// Get the workshop
module.exports.getWorkShop = async (req, res) => {
  try {
    const id = req.params.id;
    const workshop = await WorkshopModel.findById(id);
    return res.send(workshop);
  } catch (error) {
    return res.sendStatus(500);
  }
};

// Create the workshop
module.exports.createWorkShop = async (req, res) => {
  try {
    const newWorkshop = await WorkshopModel.create(req.body);
    return res.send(newWorkshop);
  } catch (error) {
    return res.sendStatus(500);
  }
};
