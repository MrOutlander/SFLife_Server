const Location = require('./path/to/location.model'); // Update with the correct path

// Get all locations
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single location by ID
const getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new location
const createLocation = async (req, res) => {
    try {
        // Check if location with the same name already exists
        const existingLocation = await Location.findOne({ name: req.body.name });
        if (existingLocation) {
            return res.status(400).json({ message: 'A location with this name already exists.' });
        }

        const location = new Location(req.body);
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a location
const editLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        Object.assign(location, req.body);
        await location.save();
        res.json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a location
const deleteLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        await location.remove();
        res.json({ message: 'Location deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    editLocation,
    deleteLocation
};
