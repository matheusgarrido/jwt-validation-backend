const createError = require('http-errors');
const UserModel = require('../Models/User.model');
const Database = require('../helpers/database');
const Validation = require('../helpers/schemaValidation');
const SchemaObject = require('../helpers/schemaObject');

const getUserByIdRequested = async (req) => {
  const { aud: userId } = req.payload;
  const user = new UserModel(await Database.findOne('user', { _id: userId }));
  return user;
};

exports.verifyUserPassword = async (req, res, next) => {
  try {
    const user = await getUserByIdRequested(req);
    const { password } = req.body;
    if (!(await user.isValidPassword(password)))
      throw createError.Unauthorized();
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getUserFullData = async (req, res, next) => {
  try {
    const user = await getUserByIdRequested(req);
    if (!user.username) throw createError.Unauthorized();
    const userData = SchemaObject.getUserFullData(user);
    res.status(200).json({ status: 200, ...userData });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { newPassword } = req.body;
    //If current password
    if (await user.isValidPassword(newPassword))
      throw createError.Conflict('Password already in use');
    //Validate password
    const passwordValidation = Validation.changePassword(newPassword);
    if (passwordValidation.error) {
      throw createError.BadRequest(passwordValidation.message);
    }
    //Save password
    user.dt_last_update = passwordValidation.value.dt_last_update;
    await user.hashPassword(newPassword);
    user.save();
    res
      .status(200)
      .json({ status: 200, message: 'Successful password change' });
  } catch (error) {
    next(error);
  }
};

exports.changeEmail = async (req, res, next) => {
  try {
    const user = req.user;
    const { email } = req.body;
    //User's current email
    if (user.email === email)
      throw createError.Conflict('This is your current e-mail');
    //Another user using this email
    const anotherUser = new UserModel(
      await Database.findOne('user', { email })
    );
    if (anotherUser.username)
      throw createError.Conflict('E-mail already in use by another user');
    //Validate email
    const emailValidation = Validation.changeEmail(email);
    if (emailValidation.error) {
      throw createError.BadRequest(emailValidation.message);
    }
    //Save email
    user.dt_last_update = emailValidation.value.dt_last_update;
    user.email = email;
    user.save();
    res.status(200).json({ status: 200, message: 'Successful e-mail change' });
  } catch (error) {
    next(error);
  }
};

exports.changeUsername = async (req, res, next) => {
  try {
    const user = req.user;
    const { username } = req.body;
    //User's current username
    if (user.username === username)
      throw createError.Conflict('This is your current username');
    //Username used by another user
    const anotherUser = new UserModel(
      await Database.findOne('user', { username })
    );
    if (anotherUser.username)
      throw createError.Conflict('Username already in use by another user');
    //Validate username
    const usernameValidation = Validation.changeUsername(username);
    if (usernameValidation.error) {
      throw createError.BadRequest(usernameValidation.message);
    }
    //Save username
    user.dt_last_update = usernameValidation.value.dt_last_update;
    user.username = username;
    user.save();
    res
      .status(200)
      .json({ status: 200, message: 'Successful username change' });
  } catch (error) {
    next(error);
  }
};

exports.changePersonalData = async (req, res, next) => {
  try {
    const user = req.user;
    const { dt_birth, role } = req.body;
    //Validate personal data
    const dataValidation = Validation.changePersonalData({ dt_birth, role });
    if (dataValidation.error) {
      throw createError.BadRequest(dataValidation.message);
    }
    //Save data
    user.dt_last_update = dataValidation.value.dt_last_update;
    user.dt_birth = dt_birth;
    user.role = role;
    user.save();
    res
      .status(200)
      .json({ status: 200, message: 'Successful personal data change' });
  } catch (error) {
    next(error);
  }
};
