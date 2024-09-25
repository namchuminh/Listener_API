const express = require('express');
const router = express.Router();
const courseService = require('../services/course.service');

router.post('/', courseService.create);
router.delete('/:id', courseService.destroy);
router.put('/:id', courseService.update);
router.get('/:id', courseService.show);
router.get('/', courseService.index);


module.exports = router;