//Imports
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');
const userRouter = require('./routes/user.route');
const accessRouter = require('./routes/access.route.js');

//DB connection
const { connection } = require('./services/database');
connection();

//Vars
const { PORT } = process.env;
const URL_PATH = `http://localhost:${PORT}`;

//Express config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/user', userRouter);
app.use('/access', accessRouter);

//App start
app.listen(PORT, () => {
  console.log(`⚡ Server running at ${URL_PATH} ⚡`);
});
