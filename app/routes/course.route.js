const express = require('express');
const router = express.Router();
const courseService = require('../services/course.service');
const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware.js');

router.post('/', courseService.create);
router.delete('/:id', courseService.destroy);
router.put('/:id', courseService.update);
router.get('/:id', courseService.show);
router.get('/:id/index', courseService.index);


module.exports = router;