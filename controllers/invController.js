const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ***************************
 *  Display vehicle detail
 * ************************** */
invCont.displayVehicleDetail = async function (req, res, next) {
    const inv_id = req.params.invId;
    const vehicle = await invModel.getVehicleById(inv_id);
    const detailHTML = await utilities.buildVehicleDetail(vehicle);
    let nav = await utilities.getNav();
    res.render("./inventory/vehicle-detail", {
        title: `${vehicle.inv_make} ${vehicle.inv_model}`,
        nav,
        detailHTML,
    });
};

/* ***************************
 *  Build Management view 
 * ************************** */
invCont.buildManagement = async function (req, res) {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        errors: null,
    })
}

/* ***************************
 *  Build Add Classification view 
 * ************************** */
invCont.buildAddClassification = async function (req, res) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
    })
}

/* ****************************************
*  Process New Classification
* *************************************** */
invCont.addClassification = async function (req, res) {
    const { classification_name } = req.body;
    const newClassification = await invModel.addClassification(
        classification_name
    )
    let nav = await utilities.getNav()

    if (newClassification) {
        req.flash(
            "notice",
            `Congratulations, you\'ve added ${classification_name}.`
        )
        res.status(201).render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors: null,
        })
    }
}

module.exports = invCont