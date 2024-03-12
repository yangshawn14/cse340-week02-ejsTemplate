const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")

const validate = {}

/*  **********************************
 *  New Classification Validation Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        // classification_name is alphabetic characters only
        body("classification_name")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Name does not meet requirements. No spaces.")
            .matches(/^[a-zA-Z]*$/, "g")
            .withMessage("Name must contain only alphabetic characters.")
            .custom((value, { req }) => {
                if (value.includes(" ")) {
                    throw new Error("Name must not contain spaces.");
                }
                return true;
            })
    ];
};

/*  **********************************
 *  New Inventory Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        // classification_id
        body('classification_id')
            .custom((value, { req }) => {
                // Check if a valid classification_id is selected
                if (!value || value === '') {
                    throw new Error('Please select a classification.');
                }
                return true;
            }),

        // inv_make
        body('inv_make')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a make.'),

        // inv_model
        body('inv_model')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a model.'),

        // inv_year
        body('inv_year')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a year.'),

        // inv_description
        body('inv_description')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a description.'),

        // inv_image
        body('inv_image')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide an image path.'),

        // inv_thumbnail
        body('inv_thumbnail')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a thumbnail path.'),

        // inv_price
        body('inv_price')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a price.')
            .matches(/^[^,]*$/, 'g')
            .withMessage('Price must not contain commas.'),

        // inv_miles
        body('inv_miles')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide miles.')
            .matches(/^[^,]*$/, 'g')
            .withMessage('Miles must not contain commas.'),

        // inv_color
        body('inv_color')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a color.'),
    ]
}

/* ******************************
 * Check classification and return errors or continue 
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add New Classification",
            nav,
            classification_id,
        })
        return
    }
    next()
}

/* ******************************
 * Check inventory and return errors or continue
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        const classifications = await invModel.getClassifications()
        let nav = await utilities.getNav()
        res.render("inventory/add-inventory", {
            errors,
            title: "Add New Vehicle",
            nav,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classification_id,
            classifications: classifications.rows,
        })
        return
    }
    next()
}

module.exports = validate