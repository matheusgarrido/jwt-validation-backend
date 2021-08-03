const express = require('express');
const UserController = require('../Controllers/User.controller');

const router = express.Router();

router.post('', UserController.create);

module.exports = router;
