import Reservation from '../mongodb/models/reservations.js'
import User from '../mongodb/models/users.js'
import Vehicle from '../mongodb/models/vehicles.js'

// Get all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('user').populate('vehicle');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('user').populate('vehicle');
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new reservation
const createReservation = async (req, res) => {
    try {
        // Check if referenced user, vehicle, and locations exist
        const userExists = await User.findById(req.body.user);
        const vehicleExists = await Vehicle.findById(req.body.vehicle);
        const pickUpLocationExists = await Location.findById(req.body.pickUpLocation);
        const dropOffLocationExists = await Location.findById(req.body.dropOffLocation);

        if (!userExists || !vehicleExists || !pickUpLocationExists || !dropOffLocationExists) {
            return res.status(400).json({ message: 'User, Vehicle, or Locations not found' });
        }

        const reservation = new Reservation(req.body);
        const newReservation = await reservation.save();

                // Update the vehicle's status to 'reserved' or a similar status
        if (vehicleExists) {
            vehicleExists.status = 'Reservado';
            await vehicleExists.save();
        }

        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a reservation
const editReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Optionally, add checks for user and vehicle existence as in addReservation

        Object.assign(reservation, req.body);
        await reservation.save();
        res.json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json({ message: 'Reservation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createReservationMobile = async (req, res) => {
    try {
        // Directly create a reservation without checking if related documents exist
        const reservation = new Reservation({
            user: req.body.user,
            vehicle: req.body.vehicle,
            pickUpLocation: req.body.pickUpLocation,
            dropOffLocation: req.body.dropOffLocation,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            // Assuming vehicleStatusUpdated is either provided by the client or defaults to false
            vehicleStatusUpdated: req.body.vehicleStatusUpdated || false,
        });

        const newReservation = await reservation.save();

        // Optionally, update the vehicle's status here if needed
        // This step can be skipped if the vehicle status update is handled elsewhere
        if (newReservation) {
            await Vehicle.findByIdAndUpdate(req.body.vehicle, { status: 'Reservado' });
        }

        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(400).json({ message: 'Failed to create reservation', error: error.message });
    }
};


export {
    getAllReservations,
    getReservationById,
    createReservation,
    editReservation,
    deleteReservation,

    //MOBILE
    createReservationMobile,
};
