const express = require('express');
const UserController = require('../Controllers/User.controller');
const { verifyAccessToken } = require('../helpers/jwt');

const router = express.Router();

router.get('', verifyAccessToken, UserController.getUserFullData);

module.exports = router;
