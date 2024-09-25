const express = require('express');
const router = express.Router();
const lecturerService = require('../services/lecturer.service.js');
const upload = require('../middlewares/upload.middleware.js')('uploads/lecturer_photos');


router.delete('/:id', lecturerService.destroy);
router.get('/:id', lecturerService.show);
router.put('/:id', upload.single('photo'), lecturerService.update);
router.post('/', upload.single('photo'), lecturerService.create);
router.get('/', lecturerService.index);

module.exports = router;
