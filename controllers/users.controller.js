import User from '../mongodb/models/users.js'
import bcrypt from 'bcrypt';

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new user
const createUser = async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Esse usuario ja existe' });
        }
        const salt = await bcrypt.genSalt(10); // 10 rounds is recommended
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            ...req.body,
            password: hashedPassword // Store the hashed password instead of the plain one
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Update a user
const editUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is being updated
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        Object.assign(user, req.body);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//MOBILE
const addFavoriteVehicle = async (req, res) => {
    const { userId, vehicleId } = req.params; // Assuming you pass these as URL parameters

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the vehicle is already in favorites
        if (!user.favourites.includes(vehicleId)) {
            user.favourites.push(vehicleId);
            await user.save();
            res.json({ message: 'Vehicle added to favorites', user });
        } else {
            res.status(400).json({ message: 'Vehicle already in favorites' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,

    //MOBILE
    addFavoriteVehicle,
};
