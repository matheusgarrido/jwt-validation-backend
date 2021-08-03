const UserController = require('./User.controller');

exports.signup = async (req, res) => {
  UserController.create(req, res);
};
