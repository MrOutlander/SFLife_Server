const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    thumb: { type: String, required: true }, 
    images: [ String ], 
    price: { type: Number, required: true },
    gearBox: { type: String, required: true },
    year: { type: Number, required: true },
    seats: { type: Number, required: true },
    doors: { type: Number, required: true },
    ac: { type: Boolean, default: false },
    gps: { type: Boolean, default: false },
    horsepower: { type: Number },
    range: { type: Number }, // Could be in kilometers or miles
    capacity: { type: Number }, // Could be in liters or cubic feet
    acceleration: { type: Number }, // Time (in seconds) to reach a certain speed
    maxSpeed: { type: Number }, // Maximum speed
    description: String,
    plateNr: { type: String, required: true, unique: true },
    features: [{ type: String }],
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'locations', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicleCategory', required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['available', 'maintenance', 'reserved'],
        default: 'available'
    },
});

vehicleSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'vehicle',
    justOne: false
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
