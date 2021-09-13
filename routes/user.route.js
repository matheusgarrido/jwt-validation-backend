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
router.patch(
  '/personal-data',
  verifyAccessToken,
  UserController.verifyUserPassword,
  UserController.changePersonalData
);
router.get(
  '/users',
  verifyAccessToken,
  UserController.verifyAdminPermission,
  UserController.getAllUsers
);
router.patch(
  '/admin',
  verifyAccessToken,
  UserController.verifyAdminPermission,
  UserController.verifyUserPassword,
  UserController.changeAdmin
);

module.exports = router;
