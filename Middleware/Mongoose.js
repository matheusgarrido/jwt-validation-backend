const mongoose = require('mongoose');
require('dotenv/config');

const { Schema } = mongoose;
const { DB_URL } = process.env;

const connection = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('✔️  Successful database connection');
  } catch (error) {
    console.log('❌ Failed database connection');
    process.exit();
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Database connection is closed');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit();
});

module.exports = { mongoose, Schema, connection };
