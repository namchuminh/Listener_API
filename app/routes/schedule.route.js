const express = require('express');
const router = express.Router();
const scheduleService = require('../services/schedule.service.js');

router.post('/', scheduleService.create);
router.delete('/:id', scheduleService.destroy);
router.get('/:id', scheduleService.show);
router.get('/', scheduleService.index);


module.exports = router;