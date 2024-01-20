const Vehicle = require('../mongodb/models/vehicles.js');
const updateVehicleAvailability = require('../utils/vehicleStatusUpdate.js')

// Get all vehicles with filtering and sorting
const getAllVehicles = async (req, res) => {
    try {
        await updateVehicleAvailability();

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

// Get a single vehicle by ID
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new vehicle
// Add a new vehicle
const addVehicle = async (req, res) => {
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
const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
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
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        await vehicle.remove();
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


module.exports = {
    getAllVehicles,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle,

    // Mobile Exports
    getAllVehiclesMobile,
};
