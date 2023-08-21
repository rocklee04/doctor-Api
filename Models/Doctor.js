const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    specialization: {type: String, enum: ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Psychiatrist'], required: true},
    experience: {type: Number, required: true},
    location: {type: String, required: true},
    date: {type: Date, required: true},
    slots: {type: Number, required: true},
    fee: {type: Number, required: true},
})

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;