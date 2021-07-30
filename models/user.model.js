const { mongoose, Schema } = require('../services/database');

const userSchema = new Schema({
  //Email
  email: {
    type: String,
    unique: true,
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

const userModel = mongoose.model('user', userSchema, 'user');

module.exports = userModel;
