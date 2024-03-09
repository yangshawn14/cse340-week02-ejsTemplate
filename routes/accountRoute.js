// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")

// Route to build login
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build register page
router.get("/register", utilities.handleErrors(accountController.buildRegister))

module.exports = router

