// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to build login
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build register page
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// route to register user
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

module.exports = router

