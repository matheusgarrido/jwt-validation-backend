const express = require('express');
const UserController = require('../Controllers/User.controller');
const { verifyAccessToken } = require('../helpers/jwt');

const router = express.Router();

router.get('', verifyAccessToken, UserController.getUserFullData);
router.patch(
  '/password',
  verifyAccessToken,
  UserController.verifyUserPassword,
  UserController.changePassword
);
router.patch(
  '/email',
  verifyAccessToken,
  UserController.verifyUserPassword,
  UserController.changeEmail
);
router.patch(
  '/username',
  verifyAccessToken,
  UserController.verifyUserPassword,
  UserController.changeUsername
);

module.exports = router;
