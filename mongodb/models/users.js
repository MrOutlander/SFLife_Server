const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'vehicles' }],
});

module.exports = mongoose.model('User', userSchema);
