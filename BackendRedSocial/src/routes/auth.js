const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// /api/auth/registro
router.post('/registro', authController.registrarUsuario);

// /api/auth/login
router.post('/login', authController.login);

module.exports = router;