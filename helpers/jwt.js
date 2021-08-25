const JWT = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv/config');

exports.signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '15s',
      audience: userId,
      issuer: 'https://github.com/matheusgarrido',
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

exports.verifyAccessToken = (req, res, next) => {
  if (!req.headers.authorization) next(createError.Unauthorized());
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      //Content error
      if (error.name === 'JsonWebTokenError')
        return next(createError.Unauthorized());
      //Another error type
      return next(createError.Unauthorized(error.message));
    }
    req.payload = payload;
    next();
  });
};

exports.signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1y',
      audience: userId,
      issuer: 'https://github.com/matheusgarrido',
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

exports.verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          reject(createError.Unauthorized());
        }
        const userId = payload.aud;
        resolve(userId);
      }
    );
  });
};
