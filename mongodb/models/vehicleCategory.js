import mongoose from "mongoose";

const vehicleCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type: String, required: true},
    thumb: { type: String, required: true },
});

const VehicleCategory = mongoose.model('VehicleCategory', vehicleCategorySchema);

export default VehicleCategory;
