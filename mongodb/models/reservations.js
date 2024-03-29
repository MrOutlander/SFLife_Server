import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    pickUpLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    dropOffLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    vehicleStatusUpdated: { type: Boolean, default: false }, 
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;

