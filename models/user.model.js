const { mongoose, hashData, validateHash } = require('../helpers/database');
const { Schema } = mongoose;
const JWT = require('../helpers/jwt');

const UserSchema = new Schema({
  //Access
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  username: { type: String, unique: true, lowercase: true, required: true },
  //Personal data
  dt_birth: { type: Date, required: true },
  role: { type: String, required: true },
  //Admin permissions
  admin: { type: Boolean, default: false },
  //Creation and last update dates
  dt_creation: { type: Date, default: Date.now },
  dt_last_update: { type: Date, default: Date.now },
  //Refresh Tokens array
  refresh_token_list: [{ type: String }],
});

UserSchema.methods.hashPassword = async function (password) {
  const hashedPassword = await hashData(password);
  this.password = hashedPassword;
};

UserSchema.methods.isValidPassword = async function (password) {
  return await validateHash(password, this.password);
};

UserSchema.methods.deleteInvalidRefreshTokens = async function () {
  const tokenList = [];
  await this.refresh_token_list.map(async (token) => {
    try {
      await JWT.verifyRefreshToken(token);
      tokenList.push(token);
    } catch (error) {
      return;
    }
  });
  this.refresh_token_list = tokenList;
};

const UserModel = mongoose.model('user', UserSchema, 'user');

module.exports = UserModel;
