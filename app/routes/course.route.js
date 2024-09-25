const express = require('express');
const router = express.Router();
const courseService = require('../services/course.service');
const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware.js');

router.post('/', authenticateToken, requireAdmin, courseService.create);
router.delete('/:id', authenticateToken, requireAdmin, courseService.destroy);
router.put('/:id', authenticateToken, requireAdmin, courseService.update);
router.get('/:id', courseService.show);
router.get('/', courseService.index);


module.exports = router;