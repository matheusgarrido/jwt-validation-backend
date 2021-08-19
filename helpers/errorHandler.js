const createError = require('http-errors');

exports.Error404 = async (req, res, next) => {
  next(createError.NotFound());
};

exports.ErrorMessage = (error, req, res, next) => {
  //HTTP status
  const status = error.status || 500;
  //Response
  res.status(status);
  res.json({
    error: {
      status,
      message: error.message,
    },
  });
};
