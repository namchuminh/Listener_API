const express = require('express');
const router = express.Router();
const departmentService = require('../services/department.service');
const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware.js');

router.post('/', authenticateToken, requireAdmin, departmentService.create);
router.delete('/:id', authenticateToken, requireAdmin, departmentService.destroy);
router.put('/:id', authenticateToken, requireAdmin, departmentService.update);
router.get('/:id', departmentService.show);
router.get('/', departmentService.index);


module.exports = router;