import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    plateNr: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    gearBox: { type: String, enum: ['Manual', 'Automático', 'DSG'], default: 'Manual', required: true },
    year: { type: Number, required: true },
    seats: { type: Number, required: true },
    doors: { type: Number, required: true },
    ac: { type: Boolean, default: false },
    gps: { type: Boolean, default: false },
    horsepower: { type: Number, required: true },
    range: { type: Number, required: true }, // Could be in kilometers or miles
    capacity: { type: Number, required: true }, // Could be in liters or cubic feet
    acceleration: { type: Number, required: true }, // Time (in seconds) to reach a certain speed
    maxSpeed: { type: Number, required: true }, // Maximum speed
    description: {type: String, required: true},
    thumb: { type: String, required: true }, 
    images: [ String ], 
    features: [{ type: String }],
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleCategory', required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['Disponível', 'Manutenção', 'Reservado', 'Alugado'],
        default: 'Disponivel'
    },
});

vehicleSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'vehicle',
    justOne: false
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
