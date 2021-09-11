const formatValue = require('./formatValue');

//Get all user data and ignore the password and refresh tokens
const getUserFullData = (user) => {
  const data = { ...user._doc };
  delete data.password;
  delete data.refresh_token_list;
  data.email = formatValue.secretEmail(data.email);
  return data;
};

module.exports = {
  getUserFullData,
};
