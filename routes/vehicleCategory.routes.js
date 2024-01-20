const express = require("express");

const {     
    getAllVehicleCategories,
    getVehicleCategoryById,
    createVehicleCategory,
    editVehicleCategory,
    deleteVehicleCategory
} = require('../controllers/vehicleCategory.controller.js')

const router = express.Router();

router.route('/').get(getAllVehicleCategories);
router.route('/:id').get(getVehicleCategoryById);
router.route('/').post(createVehicleCategory);
router.route('/:id').patch(editVehicleCategory);
router.route('/:id').delete(deleteVehicleCategory);

module.exports = router;