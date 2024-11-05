const express = require('express');
const router = express.Router();
const lecturerService = require('../services/lecturer.service.js');
const upload = require('../middlewares/upload.middleware.js')('uploads/lecturer_photos');
const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware.js');


router.delete('/:id', lecturerService.destroy);
router.put('/:id', upload.single('photo'), lecturerService.update);
router.post('/', upload.fields([{ name: 'photo' }, { name: 'photoDegree' }]), lecturerService.create);
router.patch('/:id/status',  lecturerService.status);
router.get('/:id', lecturerService.show);
router.get('/', lecturerService.index);

module.exports = router;
