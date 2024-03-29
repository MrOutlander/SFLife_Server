import Location from '../mongodb/models/locations.js'

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
            return res.status(404).json({ message: 'Localização não existe' });
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
            return res.status(400).json({ message: 'Uma localização com este nome já está registada' });
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
            return res.status(404).json({ message: 'Localização não existe' });
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
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Localização não existe' });
        }
        res.json({ message: 'Localização apagada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllLocations,
    getLocationById,
    createLocation,
    editLocation,
    deleteLocation
};
