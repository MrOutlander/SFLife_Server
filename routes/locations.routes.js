const express = require("express");

const {     
    getAllLocations,
    getLocationById,
    createLocation,
    editLocation,
    deleteLocation
} = require('../controllers/locations.controller.js')

const router = express.Router();

router.route('/').get(getAllLocations);
router.route('/:id').get(getLocationById);
router.route('/').post(createLocation);
router.route('/:id').patch(editLocation);
router.route('/:id').delete(deleteLocation);

module.exports = router;