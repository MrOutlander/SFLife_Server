const express = require("express");

const {     
    getAllReservations,
    getReservationById,
    createReservation,
    editReservation,
    deleteReservation
} = require('../controllers/reservations.controller.js')

const router = express.Router();

router.route('/').get(getAllReservations);
router.route('/:id').get(getReservationById);
router.route('/').post(createReservation);
router.route('/:id').patch(editReservation);
router.route('/:id').delete(deleteReservation);

module.exports = router;