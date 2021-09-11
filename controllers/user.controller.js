const createError = require('http-errors');
const UserModel = require('../Models/User.model');
const Database = require('../helpers/database');
const SchemaObject = require('../helpers/schemaObject');

exports.getUserFullData = async (req, res, next) => {
  try {
    const { aud: userId } = req.payload;
    const user = new UserModel(await Database.findOne('user', { _id: userId }));
    if (!user.username) throw createError.Unauthorized();
    const userData = SchemaObject.getUserFullData(user);
    res.status(200).json({ status: 200, ...userData });
  } catch (error) {
    next(error);
  }
};
