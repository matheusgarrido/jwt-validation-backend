const userController = require('./user.controller');

exports.signup = async (req, res) => {
  userController.create(req, res);
};
