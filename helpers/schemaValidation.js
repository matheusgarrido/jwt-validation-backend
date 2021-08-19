const Joi = require('@hapi/joi');

function setMessageError(validation) {
  if (validation.error) {
    return {
      ...validation,
      message: validation.error.details[0].message,
    };
  }
  return validation;
}

exports.user = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    dt_birth: Joi.date().required(),
    role: Joi.string().required(),
    admin: Joi.boolean(),
    dt_creation: Joi.date().default(new Date()),
    dt_last_update: Joi.date().default(new Date()),
  });
  const validation = schema.validate(user);
  return setMessageError(validation);
};
