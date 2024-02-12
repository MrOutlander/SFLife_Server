import express from "express"

import {     
    getAllReservations,
    getReservationById,
    createReservation,
    editReservation,
    deleteReservation,
    createReservationMobile,
    getReservationsByUserId
} from '../controllers/reservations.controller.js'

const router = express.Router();

    //MOBILE
router.route('/mobile').post(createReservationMobile);
router.route('/user/:userId').get(getReservationsByUserId);

    // DESKTOP
router.route('/').get(getAllReservations);
router.route('/:id').get(getReservationById);
router.route('/').post(createReservation);
router.route('/:id').patch(editReservation);
router.route('/:id').delete(deleteReservation);

export default router;