const express = require('express');
const router = express.Router();
const lecturerService = require('../services/lecturer.service.js');
const upload = require('../middlewares/upload.middleware.js')('uploads/lecturer_photos');
const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware.js');


router.delete('/:id', authenticateToken, requireAdmin, lecturerService.destroy);
router.put('/:id', authenticateToken, requireAdmin, upload.single('photo'), lecturerService.update);
router.post('/', authenticateToken, requireAdmin, upload.single('photo'), lecturerService.create);
router.get('/:id', lecturerService.show);
router.get('/', lecturerService.index);

module.exports = router;
