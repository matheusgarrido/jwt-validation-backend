//Imports
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');
const UserRouter = require('./routes/User.route');
const ErrorHandle = require('./Middleware/ErrorHandle');

//Vars
const { PORT } = process.env;
const URL_PATH = `http://localhost:${PORT}`;

//Express config
const App = express();
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

//Routes
App.use('/user', UserRouter);
App.use(ErrorHandle.Error404, ErrorHandle.ErrorMessage);

//App start
App.listen(PORT, () => {
  console.log(`⚡ Server running at ${URL_PATH} ⚡`);
});
