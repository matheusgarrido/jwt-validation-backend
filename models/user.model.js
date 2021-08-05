const { mongoose, Schema } = require('../Services/Database');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  //Email
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'E-mail is required'],
    //Check if has another a different user with same email
    validate: {
      validator: async function (value) {
        return await this.constructor.findOne({ email: value }).then((user) => {
          return user ? user._id.equals(this._id) : true;
        });
      },
      message: () => `This e-mail is already used by a user`,
    },
  },
  //Password
  password: { type: String, required: [true, 'Password is required'] },
  //Username
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Username is required'],
    //Check if has another a different user with same username
    validate: {
      validator: async function (value) {
        return await this.constructor
          .findOne({ username: value })
          .then((user) => {
            return user ? user._id.equals(this._id) : true;
          });
      },
      message: () => `This username is already used by a user`,
    },
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
