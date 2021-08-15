const JWT = require('jsonwebtoken');
// const createError = require('http-errors');
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
      if (err) reject(err);
      resolve(token);
    });
  });
};
