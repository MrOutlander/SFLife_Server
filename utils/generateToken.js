import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign({ 
        id: user._id, // Essential for identifying the user
        username: user.username, // Useful for display purposes
        email: user.email, // Useful for display and contact purposes
        dob: user.dob,
        phone: user.phone,
        addressStreet: user.addressStreet,
        addressCity: user.addressCity,
        avatar: user.avatar,
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

export {
    generateToken,
}