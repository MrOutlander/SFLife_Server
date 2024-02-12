import mongoose from "mongoose";

const favouritesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }],
}, { timestamps: true }); 

const Favourite = mongoose.model('Favourite', favouritesSchema);

export default Favourite;
