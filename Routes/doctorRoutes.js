const express = require('express');
const doctorController = require('../Controllers/doctorController');
const router = express.Router();

router.get('/', doctorController.getDoctors);
router.post('/appointments', doctorController.addDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);




module.exports = router;