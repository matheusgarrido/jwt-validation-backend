const express = require('express');
const AccessController = require('../Controllers/Access.controller');

const router = express.Router();

router.post('/signup', AccessController.signup);

module.exports = router;
