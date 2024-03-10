// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Route to display vehicle detail
router.get("/detail/:invId", invController.displayVehicleDetail)

// Route to managing inventory
router.get("/", invController.buildManagement)

// Route to build add-classification page
router.get("/add-classification", invController.buildAddClassification)

// Route to add new classification
router.post("/add-classification", invController.addClassification)

module.exports = router;

