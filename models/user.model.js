const { mongoose, hashData } = require('../helpers/database');
const { Schema } = mongoose;

const UserSchema = new Schema({
  //Access
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  username: { type: String, unique: true, lowercase: true, required: true },
  //Personal data
  dt_birth: { type: Date, required: true },
  role: { type: String, required: true },
  //Admin permissions
  admin: { type: String, default: false },
  //Creation and last update dates
  dt_creation: { type: Date, default: Date.now },
  dt_last_update: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  try {
    this.dt_creation = new Date();
    this.dt_last_update = new Date();
    const hashedPassword = await hashData(this.password);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model('user', UserSchema, 'user');

module.exports = UserModel;
