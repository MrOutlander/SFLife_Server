import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    avatar: { type: String, required: false },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'vehicles' }],
});

const User = mongoose.model('User', userSchema);

export default User;
