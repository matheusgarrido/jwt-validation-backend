const { mongoose, Schema } = require('../Middleware/Database/DatabaseHandle');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  //Email
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'E-mail is required'],
  },
  //Password
  password: { type: String, required: [true, 'Password is required'] },
  //Username
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Username is required'],
  },
  //Birth date
  dt_birth: {
    type: Date,
    required: [true, 'Birth date is required'],
  },
  //Role
  role: { type: String, required: [true, 'Role is required'] },
  //Admin
  admin: { type: String, default: false },
});

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model('user', UserSchema, 'user');

module.exports = UserModel;
