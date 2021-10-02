//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Routers
const AuthRouter = require('./routes/Auth.route');
const UserRouter = require('./routes/User.route');
const ErrorHandle = require('./helpers/errorHandler');

//Vars
const { PORT, CLIENTS_URL } = process.env;
const URL_PATH = `http://localhost:${PORT}`;

//Express config
const App = express();
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));
const clients = CLIENTS_URL.substring(2, CLIENTS_URL.length - 2).split('","');
App.use(cors({ origin: clients }));

//Routes
App.use('/auth', AuthRouter);
App.use('/user', UserRouter);
App.use(ErrorHandle.Error404, ErrorHandle.ErrorMessage);

//App start
App.listen(PORT, () => {
  console.log(`⚡ Server running at ${URL_PATH} ⚡`);
});
