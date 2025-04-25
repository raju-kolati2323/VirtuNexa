const express = require('express');
const {protect} = require('../middleware/auth.middleware');
const { setSchedule, getSchedules, deleteSchedule } = require('../controllers/schedule.controller');
const router = express.Router();

router.post('', protect, setSchedule );
router.get('', protect, getSchedules);
router.delete('/:id', protect, deleteSchedule)

module.exports = router