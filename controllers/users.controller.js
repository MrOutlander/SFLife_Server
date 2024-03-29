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
            return res.status(404).json({ message: 'Utilizador não existe' });
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
            return res.status(400).json({ message: 'Este usuario já existe' });
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
            return res.status(404).json({ message: 'Utilizador não existe' });
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
            return res.status(404).json({ message: 'Utilizador não existe' });
        }
        res.json({ message: 'Utilizador apagado' });
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
};
