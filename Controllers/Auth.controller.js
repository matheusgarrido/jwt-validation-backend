const createError = require('http-errors');
const UserModel = require('../Models/User.model');
const { isDuplicatedField } = require('../helpers/database');
const JWT = require('../helpers/jwt');
const Validation = require('../helpers/schemaValidation');
const { getSchemaFields } = require('../helpers/database');

exports.register = async (req, res, next) => {
  try {
    //Getting the fields with their values
    const formValue = getSchemaFields('user', req.body);
    //Validating user
    const userValidation = Validation.user(formValue);
    if (userValidation.error) {
      throw createError.BadRequest(userValidation.message);
    }
    //User Model
    const user = new UserModel(userValidation.value);
    //If e-mail already registered
    if (await isDuplicatedField('user', user, 'email')) {
      throw createError.Conflict('E-mail already registered');
    }
    //If username already registered
    if (await isDuplicatedField('user', user, 'username')) {
      throw createError.Conflict('Username already registered');
    }
    //Saving data
    await user.save();
    const accessToken = await JWT.signAccessToken(user.id);
    res.status(201).json({
      status: 201,
      message: 'Successful user creation',
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};
