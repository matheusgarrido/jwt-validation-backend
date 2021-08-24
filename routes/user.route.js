const express = require('express');
const UserController = require('../Controllers/User.controller');
const { verifyAccessToken } = require('../helpers/jwt');

const router = express.Router();

router.get('', verifyAccessToken, (req, res, next) => {
  console.log(req.payload);
  const id = req.payload.aud;
  res.status(200).json({ message: 'Successful login', id });
});

module.exports = router;
