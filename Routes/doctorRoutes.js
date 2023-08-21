const express = require('express');
const doctorController = require('../Controllers/doctorController');
const router = express.Router();

router.get('/', doctorController);
router.post('/appointments', doctorController);
router.put('/:id', doctorController);
router.delete('/:id', doctorController);




module.exports = router;