const JWT = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv/config');

exports.signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '1h',
      audience: userId,
      issuer: 'https://github.com/matheusgarrido',
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err);
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
    if (error) return next(createError.Unauthorized());
    req.payload = payload;
    next();
  });
};
