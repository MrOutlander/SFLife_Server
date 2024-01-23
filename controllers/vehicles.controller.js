import Vehicle from '../mongodb/models/vehicles.js'

// Get all vehicles with filtering and sorting
const getAllVehicles = async (req, res) => {
    // try {
    //     let query = Vehicle.find(); // Initialize the query

        
    //     // Filtering
    //     if (req.query.brand) {
    //         query = query.where('brand').equals(req.query.brand);
    //     }
    //     if (req.query.category) {
    //         query = query.where('category').equals(req.query.category);
    //     }
    //     if (req.query.gearBox) {
    //         query = query.where('gearBox').equals(req.query.gearBox);
    //     }
    //     if (req.query.gearBox) {
    //         query = query.where('plateNr').equals(req.query.plateNr);
    //     }
        
    //     // Sorting
    //     if (req.query.sortByPrice) {
    //         query = query.sort({ price: req.query.sortByPrice }); // 'asc' or 'desc'
    //     }
        
    //     const vehicles = await query.exec();
    //     res.json(vehicles);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }

    try {
        let query = Vehicle.find();

        // Apply filters based on query parameters
        if (req.query.brand) {
            query = query.where('brand').equals(req.query.brand);
        }
        if (req.query.plateNr) {
            query = query.where('plateNr').equals(req.query.plateNr);
        }

        // Sorting
        if (req.query.sortBy) {
            const sortDirection = req.query.sortDirection === 'desc' ? -1 : 1;
            query = query.sort({ [req.query.sortBy]: sortDirection });
        }

        // Populate category with only the name field
        query = query.populate('category', 'name').populate('location', 'name');

        const vehicles = await query.exec();

        // Transform the vehicles to replace the category object with just the name
        const transformedVehicles = vehicles.map(vehicle => ({
            ...vehicle.toObject(),
            category: vehicle.category.name,
            location: vehicle.location.name
        }));

        res.json(transformedVehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


// Get a single vehicle by ID
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
                                 .populate({
                                     path: 'category',
                                     select: 'name'  // Only select the name field
                                 })
                                 .populate({
                                     path: 'location',
                                     select: 'name'  // Only select the Name field
                                 })
                                 .exec();

        if (!vehicle) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Error fetching event details", error });
    } 
};


// Add a new vehicle
const createVehicle = async (req, res) => {
    try {
        // Check if vehicle with the same plate number already exists
        const existingVehicle = await Vehicle.findOne({ plateNr: req.body.plateNr });
        if (existingVehicle) {
            return res.status(400).json({ message: 'A vehicle with this plate number already exists.' });
        }

        const vehicle = new Vehicle(req.body);
        const newVehicle = await vehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Update a vehicle
const editVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Check if there are any active reservations if trying to set the vehicle as 'available'
        if (req.body.status === 'available') {
            const activeReservations = await Reservation.find({
                vehicle: vehicle._id,
                endDate: { $gte: new Date() } // Reservations that have not ended yet
            });

            if (activeReservations.length > 0) {
                return res.status(400).json({ message: 'Vehicle cannot be set to available as it has active reservations.' });
            }
        }

        // Proceed with updating the vehicle
        Object.assign(vehicle, req.body);
        await vehicle.save();
        res.json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete a vehicle
const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// MOBILE CONTROLLERS

const getAllVehiclesMobile = async (req, res) => {
    try {
        await updateVehicleAvailability();

        let query = Vehicle.find({ status: 'available' });

        // Filtering
        if (req.query.brand) {
            query = query.where('brand').equals(req.query.brand);
        }
        if (req.query.category) {
            query = query.where('category').equals(req.query.category);
        }
        if (req.query.gearBox) {
            query = query.where('gearBox').equals(req.query.gearBox);
        }

        // Sorting
        if (req.query.sortByPrice) {
            query = query.sort({ price: req.query.sortByPrice }); // 'asc' or 'desc'
        }

        const vehicles = await query.exec();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    editVehicle,
    deleteVehicle,

    // Mobile Exports
    getAllVehiclesMobile,
}
