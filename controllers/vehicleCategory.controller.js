import VehicleCategory from '../mongodb/models/vehicleCategory.js'

// Get all vehicle categories
const getAllVehicleCategories = async (req, res) => {
    try {
        const categories = await VehicleCategory.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single vehicle category by ID
const getVehicleCategoryById = async (req, res) => {
    try {
        const category = await VehicleCategory.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Categoria de viatura não existe' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new vehicle category
const createVehicleCategory = async (req, res) => {
    const category = new VehicleCategory(req.body);
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a vehicle category
const editVehicleCategory = async (req, res) => {
    try {
        const category = await VehicleCategory.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Categoria de viatura não existe' });
        }
        Object.assign(category, req.body);
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a vehicle category
const deleteVehicleCategory = async (req, res) => {
    try {
        const category = await VehicleCategory.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Categoria de viatura não existe' });
        }
        res.json({ message: 'Categoria de viatura apagada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllVehicleCategories,
    getVehicleCategoryById,
    createVehicleCategory,
    editVehicleCategory,
    deleteVehicleCategory
};
