// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventory-validation")// ADD VALIDATION TO add-classification(?) and add-inventory 

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Route to display vehicle detail
router.get("/detail/:invId", invController.displayVehicleDetail)

// Route to managing inventory
router.get("/", invController.buildManagement)

// Route to build add-classification page
router.get("/add-classification", invController.buildAddClassification)

// Route to process new classification
router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    invController.addClassification)

// Route to build ad-inventory page
router.get("/add-inventory", invController.buildAddInventory)

// Route to process new inventory
router.post(
    "/add-inventory",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    invController.addInventory)

module.exports = router;

