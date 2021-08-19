const createError = require('http-errors');
const UserModel = require('../Models/User.model');
const { isDuplicatedField } = require('../helpers/database');
const JWT = require('../helpers/jwt');

exports.register = async (req, res, next) => {
  //Instancing user
  const user = new UserModel(req.body);
  try {
    const conflictList = {};
    //If e-mail already registered
    if (await isDuplicatedField('user', user, 'email')) {
      conflictList['email'] = 'E-mail already registered';
    }
    //If username already registered
    if (await isDuplicatedField('user', user, 'username')) {
      conflictList['username'] = 'Username already registered';
    }
    if (Object.keys(conflictList).length) {
      throw createError.Conflict(conflictList);
    }
    //Validating data
    user
      .validate()
      .then(async () => {
        //Creating user
        await user.save();
        //Generating access token
        const accessToken = await JWT.signAccessToken(user.id);
        //Returning message
        res.status(201).json({
          status: 201,
          message: 'Successful user creation',
          accessToken,
        });
      })
      //If validation fails
      .catch((err) => {
        errorList = {};
        Object.keys(err.errors).map((error) => {
          errorList[err.errors[error].path] = err.errors[error].message;
        });
        next(createError.BadRequest(errorList));
      });
  } catch (err) {
    next(err);
  }
};