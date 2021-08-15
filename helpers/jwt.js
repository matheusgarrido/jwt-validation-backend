const JWT = require('jsonwebtoken');
// const createError = require('http-errors');
require('dotenv/config');

exports.signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const { JWT_SECRET } = process.env;
    const options = {
      expiresIn: '1h',
      audience: userId,
      issuer: 'https://github.com/matheusgarrido',
    };
    JWT.sign(payload, JWT_SECRET, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
