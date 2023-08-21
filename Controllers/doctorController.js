const Doctor = require('../Models/Doctor');

async function getDoctors(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skipIndex = (page-1)  * limit;
        const sort = req.query.sortBy || 'date';
        const sortOrder = req.query.sortOrder || 'asc';

        const filter = {};
        if(req.query.specialization) {
            filter.specialization = req.query.specialization;
        }
        if(req.query.search) {
            const search = new RegExp(req.query.search, 'i');

            filter.$or = [
                {name: search}
            ];
        }
        const doctors = await Doctor.find(filter).sort({[sort]: sortOrder}).skip(skipIndex).limit(limit);

        res.status(201).json(doctors);
    } catch(err) {
        res.status(400).json({message: 'An error occured'});
    }
}

async function addDoctor(req, res) {
    try{
        const doctor = new Doctor(req.body);
        await doctor.save();

        res.status(201).json({message: 'Doctor details added successfully'});
    } catch(err) {
        res.status(400).json({message: 'An error occured'});
    }
}

async function updateDoctor(req, res) {
    try{
        const {name, image, specialization, experience, location, date, slots, fee} = req.body;

        const updated = await Doctor.findByIdAndUpdate(req.params.id, {name, image, specialization, experience, location, date, slots, fee}, {new: true})

        if(!updated) {
            res.status(404).json({message: 'Doctor not found'}); 
        }

        res.status(200).json({message: 'Doctor details updated successfully'});
    } catch(err) {
        res.status(400).json({message: 'An error occured'});
    } 
}

async function deleteDoctor(req, res) {
    try{
        const deleted = await Doctor.findByIdAndDelete(req.params.id);
        if(!deleted) {
            res.status(404).json({message: 'Doctor not found'}); 
        }
        res.status(200).json({message: 'Doctor details deleted successfully'});
    } catch(err) {
        res.status(400).json({message: 'An error occured'});
    }
}


module.exports = {
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
}