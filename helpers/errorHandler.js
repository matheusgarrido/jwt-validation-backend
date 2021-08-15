const createError = require('http-errors');

exports.Error404 = async (req, res, next) => {
  next(createError.NotFound());
};

exports.ErrorMessage = (error, req, res, next) => {
  //HTTP status
  const status = error.status || 500;
  //If message is a string or a JSON object
  const jsonMessage = typeof error.message === 'object';
  //Response
  res.status(status);
  res.json({
    error: {
      status,
      jsonMessage,
      message: error.message,
    },
  });
};
