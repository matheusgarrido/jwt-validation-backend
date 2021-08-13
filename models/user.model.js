const { mongoose, hashData } = require('../Middleware/Database/DatabaseHandle');
const { Schema } = mongoose;

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
