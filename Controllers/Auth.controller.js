const createError = require('http-errors');
const UserModel = require('../Models/User.model');
const Database = require('../helpers/database');
const JWT = require('../helpers/jwt');
const Validation = require('../helpers/schemaValidation');

exports.register = async (req, res, next) => {
  try {
    //Getting the fields with their values
    const formValue = Database.getSchemaFields('user', req.body);
    //Validating user
    const userValidation = Validation.user(formValue);
    if (userValidation.error) {
      throw createError.BadRequest(userValidation.message);
    }
    //User Model
    const user = new UserModel(userValidation.value);
    //If e-mail already registered
    if (await Database.isDuplicatedField('user', user, 'email')) {
      throw createError.Conflict('E-mail already registered');
    }
    //If username already registered
    if (await Database.isDuplicatedField('user', user, 'username')) {
      throw createError.Conflict('Username already registered');
    }
    //Saving data
    await user.save();
    const accessToken = await JWT.signAccessToken(user.id);
    const refreshToken = await JWT.signRefreshToken(user.id);
    res.status(201).json({
      status: 201,
      message: 'Successful user creation',
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const formValue = { email, password };
    //Validating fields
    const userValidation = Validation.login(formValue);
    if (userValidation.error) {
      throw createError.BadRequest('Invalid email/password');
    }
    //Find user by email
    const INVALID_DATA = 'Invalid user access data';
    const user = await Database.findOne('user', { email });
    if (!user) {
      throw createError.Unauthorized(INVALID_DATA);
    }
    //Comparing inputted password and saved hash password
    const validatePassword = await user.isValidPassword(password);
    if (!validatePassword) {
      throw createError.Unauthorized(INVALID_DATA);
    }
    //Successful login
    const accessToken = await JWT.signAccessToken(user.id);
    const refreshToken = await JWT.signRefreshToken(user.id);
    res.status(200).json({
      status: 200,
      message: 'Successful user login',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: previousRefreshToken } = req.body;
    if (!previousRefreshToken) throw createError.BadRequest();
    const userId = await JWT.verifyRefreshToken(previousRefreshToken);
    const accessToken = await JWT.signAccessToken(userId);
    const refreshToken = await JWT.signRefreshToken(userId);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
