import mongoose from 'mongoose';
import Vehicle from '../mongodb/models/vehicles.js'
import Reservation from '../mongodb/models/reservations.js'

const updateVehicleAvailability = async () => {
    try {
        const endedReservations = await Reservation.find({
            endDate: { $lt: new Date() },
            vehicleStatusUpdated: false
        });

        for (const reservation of endedReservations) {
            const vehicle = await Vehicle.findById(reservation.vehicle);
            if (vehicle) {
                vehicle.status = 'available'; // Update the status as needed
                await vehicle.save();
            }
            reservation.vehicleStatusUpdated = true;
            await reservation.save();
        }
    } catch (error) {
        console.error('Error updating vehicle availability:', error);
    }
};

const updateVehicleLocations = async () => {
    const endedReservations = await Reservation.find({
        endDate: { $lt: new Date() },
        vehicleStatusUpdated: false
    }).populate('vehicle');

    for (const reservation of endedReservations) {
        if (reservation.pickUpLocation.toString() !== reservation.dropOffLocation.toString()) {
            await Vehicle.findByIdAndUpdate(reservation.vehicle._id, {
                location: reservation.dropOffLocation
            });
        }
        // Update the reservation to indicate the vehicle status has been updated
        reservation.vehicleStatusUpdated = true;
        await reservation.save();
    }
};

export {
    updateVehicleAvailability,
    updateVehicleLocations
}
