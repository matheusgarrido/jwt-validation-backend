const Joi = require('@hapi/joi');

// Schema fields config value
const EMAIL_FIELD = Joi.string().email().lowercase().required();
const USERNAME_FIELD = Joi.string().min(3).required();
const PASSWORD_FIELD = Joi.string().min(6).required();
const DT_BIRTH_FIELD = Joi.date().required();
const ROLE_FIELD = Joi.string().required();
const ADMIN_FIELD = Joi.boolean();
const REFRESH_TOKENS_FIELD = [Joi.string()];
const CURRENT_DATE_FIELD = Joi.date().default(new Date());

function setMessageError(validation) {
  if (validation.error) {
    return {
      ...validation,
      message: validation.error.details[0].message,
    };
  }
  return validation;
}

function validate(schema, data) {
  const validation = schema.validate(data);
  return setMessageError(validation);
}

exports.userRegister = (user) => {
  const schema = Joi.object({
    email: EMAIL_FIELD,
    username: USERNAME_FIELD,
    password: PASSWORD_FIELD,
    dt_birth: DT_BIRTH_FIELD,
    role: ROLE_FIELD,
    admin: ADMIN_FIELD,
    dt_creation: CURRENT_DATE_FIELD,
    dt_last_update: CURRENT_DATE_FIELD,
    refresh_token_list: REFRESH_TOKENS_FIELD,
  });
  return validate(schema, user);
};

exports.userLogin = (login) => {
  const schema = Joi.object({
    email: EMAIL_FIELD,
    password: PASSWORD_FIELD,
  });
  return validate(schema, login);
};

exports.changePassword = (newPassword) => {
  const schema = Joi.object({
    password: PASSWORD_FIELD,
    dt_last_update: CURRENT_DATE_FIELD,
  });
  return validate(schema, { password: newPassword });
};

exports.changeEmail = (email) => {
  const schema = Joi.object({
    email: EMAIL_FIELD,
    dt_last_update: CURRENT_DATE_FIELD,
  });
  return validate(schema, { email });
};

exports.changeUsername = (username) => {
  const schema = Joi.object({
    username: USERNAME_FIELD,
    dt_last_update: CURRENT_DATE_FIELD,
  });
  return validate(schema, { username });
};

exports.changePersonalData = (personalData) => {
  const schema = Joi.object({
    dt_birth: DT_BIRTH_FIELD,
    role: ROLE_FIELD,
    dt_last_update: CURRENT_DATE_FIELD,
  });
  return validate(schema, personalData);
};
