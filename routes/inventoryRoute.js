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

module.exports = router;

