import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign({ 
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        dob: user.dob,
        phone: user.phone,
        addressStreet: user.addressStreet,
        addressCity: user.addressCity,
        avatar: user.avatar,
        favourites: user.favourites,
        }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token expires in 1 hour
    });
};

export {
    generateToken,
}