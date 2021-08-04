const { mongoose, Schema, connection } = require('../Middleware/Mongoose');

connection();

module.exports = { mongoose, Schema };
