import express from "express"

import {     
    getAllVehicles,
    getVehicleById,
    createVehicle,
    editVehicle,
    deleteVehicle,

    // Mobile Exports
    getAllVehiclesMobile,
} from '../controllers/vehicles.controller.js'

const router = express.Router();

router.route('/').get(getAllVehicles);
router.route('/:id').get(getVehicleById);
router.route('/').post(createVehicle);
router.route('/:id').patch(editVehicle);
router.route('/:id').delete(deleteVehicle);
router.route('/mobile').get(getAllVehiclesMobile);

// MOBILE
router.route('/').get(getAllVehiclesMobile);

export default router;