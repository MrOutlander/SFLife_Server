import AdminUser from '../mongodb/models/adminUsers.js'

// Get all admin users
const getAllAdminUsers = async (req, res) => {
    try {
        const adminUsers = await AdminUser.find();
        res.json(adminUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single admin user by ID
const getAdminUserById = async (req, res) => {
    try {
        const adminUser = await AdminUser.findById(req.params.id);
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found' });
        }
        res.json(adminUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new admin user
const createAdminUser = async (req, res) => {
//     try {
//         // Check if admin user already exists
//         const existingAdminUser = await AdminUser.findOne({ email: req.body.email });
//         if (existingAdminUser) {
//             return res.status(400).json({ message: 'An admin user with this email already exists.' });
//         }

//         const adminUser = new AdminUser(req.body);
//         const newAdminUser = await adminUser.save();
//         res.status(201).json(newAdminUser);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

    try {
        // Check if admin user already exists
        const existingAdminUser = await AdminUser.findOne({ email: req.body.email });
        if (existingAdminUser) {
            // User exists, log them in
            // Here, you can include any additional logic you need for a login
            // For example, you might want to update the last login timestamp or similar
            return res.status(200).json({ 
                message: 'Admin user logged in successfully.', 
                user: existingAdminUser
            });
        }

        // If user does not exist, create a new user
        const adminUser = new AdminUser({
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar
            // other properties as needed
        });
        const newAdminUser = await adminUser.save();
        res.status(201).json({ 
            message: 'Admin user created successfully.', 
            user: newAdminUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an admin user
const editAdminUser = async (req, res) => {
    try {
        const adminUser = await AdminUser.findById(req.params.id);
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found' });
        }
        Object.assign(adminUser, req.body);
        await adminUser.save();
        res.json(adminUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an admin user
const deleteAdminUser = async (req, res) => {
    try {
        const adminUser = await AdminUser.findByIdAndDelete(req.params.id);
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found' });
        }
        res.json({ message: 'Admin user deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllAdminUsers,
    getAdminUserById,
    createAdminUser,
    editAdminUser,
    deleteAdminUser
};
