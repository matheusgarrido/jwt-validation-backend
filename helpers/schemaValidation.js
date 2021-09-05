const Joi = require('@hapi/joi');

// Schema fields config value
const EMAIL_FIELD = Joi.string().email().lowercase().required();
const PASSWORD_FIELD = Joi.string().min(6).required();
const CURRENT_DATE_FIELD = Joi.date().default(new Date());
const REFRESH_TOKENS_FIELD = [Joi.string()];

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
    username: Joi.string().min(3).required(),
    password: PASSWORD_FIELD,
    dt_birth: Joi.date().required(),
    role: Joi.string().required(),
    admin: Joi.boolean(),
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
