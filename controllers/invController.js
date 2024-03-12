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
        res.status(201).render("./inventory/management", {
            title: "Vehicle Management",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, adding the classification failed.")
        res.status(501).render("./inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors: null,
        })
    }
}

/* ****************************************
*  Buiild New Inventory Page
* *************************************** */
invCont.buildAddInventory = async function (req, res) {
    const classifications = await invModel.getClassifications();
    let nav = await utilities.getNav()
    res.render("./inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classifications: classifications.rows,
        errors: null,
    })
}

/* ****************************************
*  Process New Inventory
* *************************************** */
invCont.addInventory = async function (req, res) {
    try {
        console.log(req.body); // Log the request body to inspect its contents


        const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body;

        // Proceed with further processing
        const invResult = await invModel.addInventory({
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classification_id
        });

        let nav = await utilities.getNav()

        if (invResult) {
            req.flash(
                "notice",
                `Congratulations, you\'ve added ${inv_make} ${inv_model}.`
            );
            res.status(201).render("./inventory/management", {
                title: "Vehicle Management",
                nav,
                errors: null,
            });
        } else {
            req.flash("notice", "Sorry, the failed add new car.");
            res.status(501).render("./inventory/add-inventory", {
                title: "Add New Vehicle",
                nav,
                errors: null,
            });
        }
    } catch (error) {
        console.error("Error processing new inventory:", error);
        req.flash("error", "An error occurred while processing the vehicle.");
        res.status(500).redirect("./inventory/add-inventory");
    }
}


module.exports = invCont