const express = require('express');
const router = express.Router();

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

router.get('/trigger-error', (req, res, next) => {
    // Intentionally throw an error to trigger a 500-type error
    throw new Error('Intentional 500-type error');
});

module.exports = router;



