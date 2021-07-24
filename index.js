const express = require('express');
require('dotenv/config');

const { connection } = require('./services/database');
connection();

const app = express();
const { PORT } = process.env;

const URL_PATH = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`⚡ Server running at ${URL_PATH} ⚡`);
});
