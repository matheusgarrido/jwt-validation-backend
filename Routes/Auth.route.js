const express = require('express');
const AuthController = require('../Controllers/Auth.controller');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.patch('/refresh-token', AuthController.refreshToken);

module.exports = router;
