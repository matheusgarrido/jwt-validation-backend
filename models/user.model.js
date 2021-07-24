const { mongoose, Schema } = require('../services/database');

const userSchema = new Schema({
  // _id: ObjectId(),
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  dt_birth: { type: Date, required: true },
  role: { type: String, required: true },
  admin: { type: String, default: false },
});

const userModel = mongoose.model('user', userSchema, 'user');

module.exports = userModel;
