const express = require("express");

const {     
    getAllVehicles,
    getVehicleById,
    createVehicle,
    editVehicle,
    deleteVehicle,

    // Mobile Exports
    getAllVehiclesMobile,
} = require('../controllers/vehicles.controller.js')

const router = express.Router();

router.route('/').get(getAllVehicles);
router.route('/:id').get(getVehicleById);
router.route('/').post(createVehicle);
router.route('/:id').patch(editVehicle);
router.route('/:id').delete(deleteVehicle);

// MOBILE
router.route('/').get(getAllVehiclesMobile);

module.exports = router;