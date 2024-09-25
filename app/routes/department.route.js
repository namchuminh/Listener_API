const express = require('express');
const router = express.Router();
const departmentService = require('../services/department.service');

router.post('/', departmentService.create);
router.delete('/:id', departmentService.destroy);
router.put('/:id', departmentService.update);
router.get('/:id', departmentService.show);
router.get('/', departmentService.index);


module.exports = router;