const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service.js');

router.post('/login', authService.login);
router.post('/refresh-token', authService.refreshToken);

module.exports = router;