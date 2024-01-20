import express from "express";

import {     
    getAllVehicleCategories,
    getVehicleCategoryById,
    createVehicleCategory,
    editVehicleCategory,
    deleteVehicleCategory
} from '../controllers/vehicleCategory.controller.js'

const router = express.Router();

router.route('/').get(getAllVehicleCategories);
router.route('/:id').get(getVehicleCategoryById);
router.route('/').post(createVehicleCategory);
router.route('/:id').patch(editVehicleCategory);
router.route('/:id').delete(deleteVehicleCategory);

export default router;